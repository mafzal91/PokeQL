var mongo = require('../../services/mongodb');
var { Name } = require('../commonModels');
var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var FlavorBerry = new Schema({
  potency:                 { type: Number, required: true },
  berry:                   { type: ObjectId, ref: "Berry", default: null },
},{_id: false})

var BerryFlavorSchema = new Schema({
  pokeapi_id:              { type: Number, required: true },
  name:                    { type: String, required: true },
  berries:                 [FlavorBerry],
  contest_type:            { type: ObjectId, ref: "ContestType", default: null },
  names:                   [Name],
}, {
  versionKey: false,
  timestamp: true
});


class BerryFlavor {
  static getBerryFlavors (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.berryFlavor.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getBerryFlavor(parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.berryFlavor.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}


BerryFlavorSchema.pre('save', (next) => next())

BerryFlavorSchema.virtual('id').get(() => this._id)

BerryFlavorSchema.set('toJSON', {
  virtuals: true
});

BerryFlavorSchema.loadClass(BerryFlavor)

module.exports = mongo.model('BerryFlavor', BerryFlavorSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
