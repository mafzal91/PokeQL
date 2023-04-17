import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {PokemonShape as PokemonShapeSchema} from "./pokemonSchemas.js";

class PokemonShape {
  static getPokemonShapes(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    return models.pokemonShape
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getPokemonShape(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.shape) {
        id = parent.shape;
      }
    }

    return models.pokemonShape
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

PokemonShapeSchema.loadClass(PokemonShape);

export default mongo.model("PokemonShape", PokemonShapeSchema);
