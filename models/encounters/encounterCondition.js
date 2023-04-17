import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {EncounterCondition as EncounterConditionSchema} from "./encounterSchemas.js";

class EncounterCondition {
  static getEncounterConditions(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    return models.encounterCondition
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getEncounterCondition(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.condition) {
        id = parent.condition;
      }
    }

    return models.encounterCondition
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

EncounterConditionSchema.loadClass(EncounterCondition);

export default mongo.model("EncounterCondition", EncounterConditionSchema);
