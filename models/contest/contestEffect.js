var mongo = require('../../services/mongodb');
var {Effect, FlavorText} = require('../commonModels')
var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;
var ContestEffectSchema = new Schema({
  pokeapi_id:               { type: Number, default: 0 },
  appeal:                   { type: Number, default: null },
  jam:                      { type: Number, default: null },
  effect_entries:           { type: [Effect], default: [] },
  flavor_text_entries:      { type: [FlavorText], default: [] },
}, {
  versionKey: false,
  timestamp: true
});

ContestEffectSchema.pre('save', function(next) {
  next();
});

ContestEffectSchema.virtual('id').get(function () {
  return this._id;
});

ContestEffectSchema.set('toJSON', {
  virtuals: true
});

// ContestEffectSchema.loadClass(ContestType)

module.exports = mongo.model('ContestEffect', ContestEffectSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
