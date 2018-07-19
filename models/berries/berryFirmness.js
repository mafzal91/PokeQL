var mongo = require('../../services/mongodb');
var { Name } = require('../commonModels');
var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;
var { getProjection } = require('../../utils');

var BerryFirmnessSchema = new Schema({
  pokeapi_id:               { type: Number, required: true },
  name:                     { type: String, default: "" },
  berries:                  [{ type: ObjectId, ref: "Berry", default: null }],
  names:                    [Name],
}, {
  versionKey: false,
  timestamp: true
});


class BerryFirmness {
  static getBerryFirmnesses (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return Models.berryFirmness.find(query)
      .select(projection)
      .skip(skip)
      .limit(limit).sort({pokeapi_id: 1})
      .exec()
      .then(data => data)
      .catch(error => error)
  }

  static getBerryFirmness(parent, {id}, Models, info) {
    const projection = getProjection(info);
    if (parent) {
      if (parent._id) {
        id = parent._id
      }
      if(parent.firmness) {
        id = parent.firmness
      }
    }

    return Models.berryFirmness.findById(id)
      .select(projection)
      .exec()
      .then(data => data)
      .catch(error => error)
  }
}


BerryFirmnessSchema.pre('save', (next) => next())

BerryFirmnessSchema.virtual('id').get(function() {
  return this._id;
});

BerryFirmnessSchema.set('toJSON', {
  virtuals: true
});

BerryFirmnessSchema.loadClass(BerryFirmness)

module.exports = mongo.model('BerryFirmness', BerryFirmnessSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
