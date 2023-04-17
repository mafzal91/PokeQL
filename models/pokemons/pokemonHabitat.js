import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {PokemonHabitat as PokemonHabitatSchema} from "./pokemonSchemas.js";

class PokemonHabitat {
  static getPokemonHabitats(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);
    return models.pokemonHabitat
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getPokemonHabitat(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.habitat) {
        id = parent.habitat;
      }
    }

    return models.pokemonHabitat
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

PokemonHabitatSchema.loadClass(PokemonHabitat);

export default mongo.model("PokemonHabitat", PokemonHabitatSchema);
