var mongo = require('../../services/mongodb');
var {Description, Name} = require('../commonModels')
var { getProjection } = require('../../utils');

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
    return new Promise((resolve, reject) => {

      Models.pokedex.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getPokedex (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent.id) { id = parent.id }
        if (parent.regions) { id = {$in: parent.regions} }
      }
      Models.pokedex.find({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
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
