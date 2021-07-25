import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
const EvolutionChainSchema = require("./evolutionSchemas").EvolutionChain;

class EvolutionChain {
  static getEvolutionChains(parent, {query, skip, limit}, Models, info) {
    const projection = getProjection(info);

    return Models.evolutionChain
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getEvolutionChain(parent, {id}, Models, info) {
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

    return Models.evolutionChain
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

EvolutionChainSchema.loadClass(EvolutionChain);

export default mongo.model("EvolutionChain", EvolutionChainSchema);
