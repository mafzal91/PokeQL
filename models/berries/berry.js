var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var BerryFlavor = new Schema({
  potency:                  { type: Number, required: true },
  flavor:                   { type: ObjectId, ref: "BerryFlavor", default: null },
},{_id: false})

var BerrySchema = new Schema({
  pokeapi_id:               { type: Number, required: true },
  name:                     { type: String, required: true },
  growth_time:              { type: Number, default: null },
  max_harvest:              { type: Number, default: null },
  natural_gift_power:       { type: Number, default: null },
  size:                     { type: Number, default: null },
  smoothness:               { type: Number, default: null },
  soil_dryness:             { type: Number, default: null },
  firmness:                 { type: ObjectId, ref:"BerryFirmness", default: null },
  flavors:                  { type: [BerryFlavor], default: [] },
  item:                     { type: ObjectId, ref:"Item", default: null },
  natural_gift_type:        { type: ObjectId, ref:"Type", default: null },
}, {
  versionKey: false,
  timestamp: true
});

class Berry {
  static getBerries (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
    console.log(projection)

    return Models.berry.find(query)
      .select(projection)
      .skip(skip)
      .limit(limit).sort({pokeapi_id: 1})
      .exec()
      .then(data => data)
      .catch(error => error)
  }

  static getBerry(parent, {id}, Models, info) {
    const projection = getProjection(info);
      console.log("Berry parent", parent)
      if (parent) {
        if (parent._id) { id = parent._id }
        if (parent.berry) { id = parent.berry }
      }

      return Models.berry.findById(id)
        .select(projection)
        .exec()
        .then(data => {
          console.log(data)
          return data
        })
        .catch(error => error)
  }
}


BerrySchema.pre('save', (next) => next())

BerrySchema.virtual('id').get(function() {
  return this._id;
});

BerrySchema.set('toJSON', {
  virtuals: true
});

BerrySchema.loadClass(Berry)

module.exports = mongo.model('Berry', BerrySchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
