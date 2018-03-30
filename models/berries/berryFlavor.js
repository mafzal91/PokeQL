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


BerryFlavorSchema.pre('save', function(next) {
  next();
});

BerryFlavorSchema.virtual('id').get(function () {
  return this._id;
});

BerryFlavorSchema.set('toJSON', {
  virtuals: true
});

// BerryFlavorSchema.loadClass(BerryFlavor)

module.exports = mongo.model('BerryFlavor', BerryFlavorSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
