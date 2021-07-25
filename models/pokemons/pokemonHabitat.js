import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
const PokemonHabitatSchema = require("./pokemonSchemas").PokemonHabitat;

class PokemonHabitat {
  static getPokemonHabitats(parent, {query, skip, limit}, Models, info) {
    const projection = getProjection(info);
    return Models.pokemonHabitat
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getPokemonHabitat(parent, {id}, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.habitat) {
        id = parent.habitat;
      }
    }

    return Models.pokemonHabitat
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

PokemonHabitatSchema.loadClass(PokemonHabitat);

export default mongo.model("PokemonHabitat", PokemonHabitatSchema);
