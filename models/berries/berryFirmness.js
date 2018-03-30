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


BerryFirmnessSchema.pre('save', function(next) {
  next();
});

BerryFirmnessSchema.virtual('id').get(function () {
  return this._id;
});

BerryFirmnessSchema.set('toJSON', {
  virtuals: true
});

// BerryFirmnessSchema.loadClass(BerryFirmness)

module.exports = mongo.model('BerryFirmness', BerryFirmnessSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
