import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {EvolutionTrigger as EvolutionTriggerSchema} from "./evolutionSchemas.js";

class EvolutionTrigger {
  static getEvolutionTriggers(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    return models.evolutionTrigger
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getEvolutionTrigger(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.trigger) {
        id = parent.trigger;
      }
    }

    return models.evolutionTrigger
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

EvolutionTriggerSchema.loadClass(EvolutionTrigger);

export default mongo.model("EvolutionTrigger", EvolutionTriggerSchema);
