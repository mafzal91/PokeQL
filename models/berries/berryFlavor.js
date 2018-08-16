var mongo = require('../../services/mongodb');
var { Name } = require('../commonModels');
var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;
var { getProjection } = require('../../utils');

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
    console.log("berry flavor", projection)

    return Models.berryFlavor.find(query)
      .select(projection)
      .skip(skip)
      .limit(limit).sort({pokeapi_id: 1})
      .then(data => data)
      .catch(error => error)
  }

  static getBerryFlavor(parent, {id}, Models, info) {
    const projection = getProjection(info);
    console.log(parent)
    if (parent) {
      if(parent.id) { id = parent._id }
      if(parent.flavor) { id = parent.flavor }
      if(parent.berry_flavor) { id = parent.berry_flavor }
      if(parent.hates_flavor) { id = parent.hates_flavor }
      if(parent.likes_flavor) { id = parent.likes_flavor }
    }

    return Models.berryFlavor.findById(id)
      .select(projection)
      .then(data => data)
      .catch(error => error)
  }
}


BerryFlavorSchema.pre('save', (next) => next())

BerryFlavorSchema.virtual('id').get(function(){ return this._id })

BerryFlavorSchema.set('toJSON', {
  virtuals: true
});

BerryFlavorSchema.loadClass(BerryFlavor)

module.exports = mongo.model('BerryFlavor', BerryFlavorSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
