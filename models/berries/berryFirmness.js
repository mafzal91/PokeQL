var mongo = require('../../services/mongodb');
var { Name } = require('../commonModels');
// var x = require('../commonModels');
var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

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

    return new Promise((resolve, reject) => {

      Models.berryFirmness.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getBerryFirmness(parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.berryFirmness.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}


BerryFirmnessSchema.pre('save', (next) => next())

BerryFirmnessSchema.virtual('id').get(() => this._id)

BerryFirmnessSchema.set('toJSON', {
  virtuals: true
});

BerryFirmnessSchema.loadClass(BerryFirmness)

module.exports = mongo.model('BerryFirmness', BerryFirmnessSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
