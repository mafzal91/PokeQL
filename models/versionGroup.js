var mongo = require('../services/mongodb');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var VersionGroup = new Schema({
  name:                   { type: String, required: true },
  pokeapi_id:             { type: Number, required: true },
  generation:             { type: ObjectId, ref: 'Generation', required: true },
  regions:                [{ type: ObjectId, ref: 'Region', default: null }],
  pokedexes:              [{ type: ObjectId, ref: 'Pokedex', default: null }],
  order:                  { type: Number, required: true },
}, {
  versionKey: false,
  timestamp: true
});

VersionGroup.pre('save', function(next) {
  next();
});

VersionGroup.virtual('id').get(function () {
  return this._id;
});

VersionGroup.set('toJSON', {
  virtuals: true
});

module.exports = mongo.model('VersionGroup', VersionGroup);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
