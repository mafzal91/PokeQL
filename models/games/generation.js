var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var {Name} = require('../commonModels')

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var GenerationSchema = new Schema({
  pokeapi_id:         { type: Number, required: true },
  name:               { type: String, required: true },
  abilities:          [{ type: ObjectId, ref: 'Ability', default: null}],
  names:              [Name],
  main_region:        { type: ObjectId, ref: 'Region', default: null},
  moves:              [{ type: ObjectId, ref: 'Move', default: null}],
  pokemon_species:    [{ type: ObjectId, ref: 'PokemonSpecies', default: null}],
  types:              [{ type: ObjectId, ref: 'Types', default: null}],
  version_groups:     [{ type: ObjectId, ref: 'VersionGroups', default: null}],
}, {
  versionKey: false,
  timestamp: true
});

class Generation {
  static getGenerations (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return Models.generation.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .then(data => data)
        .catch(error => error)
  }

  static getGeneration (parent, { id }, Models, info) {
    const projection = getProjection(info);

      if (parent) {
        if (parent.generation) { id = parent.generation }
        if (parent.main_generation) { id = parent.main_generation }
      }

    return Models.generation.findById(id)
        .select(projection)
        .then(data => data)
        .catch(error => error)
  }
}

// Generation.pre('save', function(next) {
//   next();
// });
//
// Generation.virtual('id').get(function () {
//   return this._id;
// });

GenerationSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id;
  },
});

GenerationSchema.loadClass(Generation)

module.exports = mongo.model('Generation', GenerationSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
