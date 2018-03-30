var mongo = require('../../services/mongodb');
var PokemonSpeciesSchema = require('./pokemonSchemas').PokemonSpecies;

class PokemonSpecies {
  static getPokemonSpeciess (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.pokemonSpecies.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getPokemonSpecie (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.pokemonSpecies.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

PokemonSpeciesSchema.loadClass(PokemonSpecies)

module.exports = mongo.model('PokemonSpecies', PokemonSpeciesSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
