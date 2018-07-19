var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var {Description, Name} = require('../commonModels')

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var PokemonEntry = new Schema({
  entry_number:          { type: Number, required: true },
  pokemon_species:       { type: ObjectId, ref: 'PokemonSpecies', default: null },
},{
  _id: false
})

var PokedexSchema = new Schema({
  pokeapi_id:             { type: Number, required: true },
  name:                   { type: String, required: true },
  is_main_series:         { type: Boolean, default: false },
  descriptions:           [Description],
  names:                  [Name],
  pokemon_entries:        [PokemonEntry],
  region:                 { type: ObjectId, ref: 'Region', default: null},
  version_groups:         [{ type: ObjectId, ref: 'VersionGroup', default: null}],
}, {
  versionKey: false,
  timestamp: true
});

class Pokedex {
  static getPokedexes (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
    // console.log(projection)

    if(parent){
      if(parent.pokedexes) { query = { _id: { $in: parent.pokedexes } } }
    }

    return Models.pokedex.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getPokedex (parent, {id}, Models, info) {
    const projection = getProjection(info);
      if (parent) {
        if (parent._id) { id = parent.id }
      }
    return Models.pokedex.findById(id)
        .select(projection)
        .exec()
        .then(data => data)
        .catch(error => error)
  }
}

PokedexSchema.pre('save', function(next) {
  next();
});

PokedexSchema.virtual('id').get(function () {
  return this._id;
});

PokedexSchema.set('toJSON', {
  virtuals: true
});

PokedexSchema.loadClass(Pokedex)

module.exports = mongo.model('Pokedex', PokedexSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
