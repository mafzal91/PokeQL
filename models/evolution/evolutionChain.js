import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {EvolutionChain as EvolutionChainSchema} from "./evolutionSchemas.js";

class EvolutionChain {
  static getEvolutionChains(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    return models.evolutionChain
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getEvolutionChain(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.baby_trigger_for) {
        id = parent.baby_trigger_for;
      }
      if (parent.evolution_chain) {
        id = parent.evolution_chain;
      }
    }

    return models.evolutionChain
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

EvolutionChainSchema.loadClass(EvolutionChain);

export default mongo.model("EvolutionChain", EvolutionChainSchema);
