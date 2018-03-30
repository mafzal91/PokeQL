var mongo = require('../../services/mongodb');

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

MachineSchema.pre('save', function(next) {
  next();
});

MachineSchema.virtual('id').get(function () {
  return this._id;
});

MachineSchema.set('toJSON', {
  virtuals: true
});


module.exports = mongo.model('Machine', MachineSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
