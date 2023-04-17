import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {PokemonForm as PokemonFormSchema} from "./pokemonSchemas.js";

class PokemonForm {
  static getPokemonForms(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent.forms) {
        query = {_id: {$in: parent.forms}};
      }
    }

    return models.pokemonForm
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getPokemonForm(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.form) {
        id = parent.form;
      }
    }

    return models.pokemonForm
      .findById({_id: id})
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

PokemonFormSchema.loadClass(PokemonForm);

export default mongo.model("PokemonForm", PokemonFormSchema);
