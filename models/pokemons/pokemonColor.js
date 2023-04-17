import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {PokemonColor as PokemonColorSchema} from "./pokemonSchemas.js";

class PokemonColor {
  static getPokemonColors(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);
    return models.pokemonColor
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getPokemonColor(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.color) {
        id = parent.color;
      }
    }

    return models.pokemonColor
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

PokemonColorSchema.loadClass(PokemonColor);

export default mongo.model("PokemonColor", PokemonColorSchema);
