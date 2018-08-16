var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var MachineSchema = new Schema({
  pokeapi_id:       { type: Number, required: true },
  item:             { type: ObjectId, ref: "Item", default: null },
  move:             { type: ObjectId, ref: "Move", default: null },
  version_group:    { type: ObjectId, ref: "VersionGroup", default: null },
},{
  versionKey: false,
  timestamp: true
})

class Machine {
  static getMachines (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return Models.machine.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .then(data => data)
        .catch(error => error)
  }

  static getMachine (parent, {id}, Models, info) {
    const projection = getProjection(info);
    console.log(parent)
      if (parent) {
        if (parent._id) { id = parent._id }
        if (parent.machine) { id = parent.machine }
      }

    return Models.machine.findById(id)
        .select(projection)
        .then(data => data)
        .catch(error => error)
  }
}


MachineSchema.pre('save', function(next) {
  next();
});

MachineSchema.virtual('id').get(function () {
  return this._id;
});

MachineSchema.set('toJSON', {
  virtuals: true
});

MachineSchema.loadClass(Machine)

module.exports = mongo.model('Machine', MachineSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
