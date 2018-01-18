var mongo = require('../services/mongodb');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var Region = new Schema({
  name:                   { type: String, required: true },
  pokeapi_id:             { type: Number, required: true },
  locations:              [{ type: ObjectId, ref: 'Location', default: null }],
  version_group:          [{ type: ObjectId, ref: 'VersionGroup', default: null }],
  main_generation:        { type: ObjectId, ref: 'Generation', default: null },
  pokedexes:              [{ type: ObjectId, ref: 'Pokedex', default: null }],
}, {
  versionKey: false,
  timestamp: true
});

Region.pre('save', function(next) {
  next();
});

Region.virtual('id').get(function () {
  return this._id;
});

Region.set('toJSON', {
  virtuals: true
});

module.exports = mongo.model('Region', Region);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
