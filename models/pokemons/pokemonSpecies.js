import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {PokemonSpecies as PokemonSpeciesSchema} from "./pokemonSchemas.js";

class PokemonSpecies {
  static getPokemonSpeciess(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent.pokemon_species) {
        query = {_id: {$in: parent.pokemon_species}};
      }
    }

    return models.pokemonSpecies
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getPokemonSpecies(parent, {id}, {models}, info) {
    const projection = getProjection(info);
    // console.log("SPECIES", parent)
    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.species) {
        id = parent.species;
      }
      if (parent.pokemon_species) {
        id = parent.pokemon_species;
      }
      if (parent.evolves_from_species) {
        id = parent.evolves_from_species;
      }
    }

    return models.pokemonSpecies
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

PokemonSpeciesSchema.loadClass(PokemonSpecies);

export default mongo.model("PokemonSpecies", PokemonSpeciesSchema);
