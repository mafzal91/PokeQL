var mongo = require('../services/mongodb');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var Pokedex = new Schema({
  name:                   { type: String, required: true },
  pokeapi_id:             { type: Number, required: true },
  region:                 [{ type: ObjectId, ref: 'Region', default: null }],
  version_group:          [{ type: ObjectId, ref: 'VersionGroup', default: null }],
  is_main_series:         { type: Boolean, default: false },
  description:            { type: String, default: ""},
  pokemon_entries:        [{ type: ObjectId, ref: 'PokemonSpecies', default: null }],
}, {
  versionKey: false,
  timestamp: true
});

Pokedex.pre('save', function(next) {
  next();
});

Pokedex.virtual('id').get(function () {
  return this._id;
});

Pokedex.set('toJSON', {
  virtuals: true
});

module.exports = mongo.model('Pokedex', Pokedex);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
