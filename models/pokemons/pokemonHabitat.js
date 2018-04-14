var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var PokemonHabitatSchema = require('./pokemonSchemas').PokemonHabitat;

class PokemonHabitat {
  static getPokemonHabitats (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.pokemonHabitat.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getPokemonHabitat (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.pokemonHabitat.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

PokemonHabitatSchema.loadClass(PokemonHabitat)

module.exports = mongo.model('PokemonHabitat', PokemonHabitatSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
