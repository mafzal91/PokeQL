var mongo = require('../../services/mongodb');

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



BerrySchema.pre('save', function(next) {
  next();
});

BerrySchema.virtual('id').get(function () {
  return this._id;
});

BerrySchema.set('toJSON', {
  virtuals: true
});

// BerrySchema.loadClass(Berry)

module.exports = mongo.model('Berry', BerrySchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
