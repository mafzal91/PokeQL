var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var PokemonHabitatSchema = require('./pokemonSchemas').PokemonHabitat;

class PokemonHabitat {
  static getPokemonHabitats (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
		return Models.pokemonHabitat.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getPokemonHabitat (parent, {id}, Models, info) {
    const projection = getProjection(info);


      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

		return Models.pokemonHabitat.findById(id)
        .select(projection)
        .exec()
        .then(data => data)
        .catch(error => error)
  }
}

PokemonHabitatSchema.loadClass(PokemonHabitat)

module.exports = mongo.model('PokemonHabitat', PokemonHabitatSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
