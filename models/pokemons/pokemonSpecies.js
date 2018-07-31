var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var PokemonSpeciesSchema = require('./pokemonSchemas').PokemonSpecies;

class PokemonSpecies {
  static getPokemonSpeciess (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent.pokemon_species) { query = { _id: {$in: parent.pokemon_species} } }
    }

    return Models.pokemonSpecies.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getPokemonSpecies (parent, {id}, Models, info) {
    const projection = getProjection(info);
    // console.log("SPECIES", parent)
    if (parent) {
      if (parent._id) { id = parent._id; }
      if (parent.species) { id = parent.species; }
      if (parent.pokemon_species) { id = parent.pokemon_species; }
      if (parent.evolves_from_species) { id = parent.evolves_from_species }
    }

    return Models.pokemonSpecies.findById(id)
        .select(projection)
        .exec()
        .then(data => data)
        .catch(error => error)
  }
}

PokemonSpeciesSchema.loadClass(PokemonSpecies)

module.exports = mongo.model('PokemonSpecies', PokemonSpeciesSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
