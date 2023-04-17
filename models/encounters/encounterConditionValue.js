import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";

import {EncounterConditionValue as EncounterConditionValueSchema} from "./encounterSchemas.js";

class EncounterConditionValue {
  static getEncounterConditionValues(
    parent,
    {query, skip, limit},
    {models},
    info,
  ) {
    const projection = getProjection(info);

    console.log("COndition value", parent.condition_values);
    if (parent) {
      if (parent.condition_values)
        query = {_id: {$in: parent.condition_values}};
    }
    if (query) {
      return models.encounterConditionValue
        .find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .sort({pokeapi_id: 1})
        .then((data) => data)
        .catch((error) => error);
    } else {
      return null;
    }
  }

  static getEncounterConditionValue(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
    }

    return models.encounterConditionValue
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

EncounterConditionValueSchema.loadClass(EncounterConditionValue);

export default mongo.model(
  "EncounterConditionValue",
  EncounterConditionValueSchema,
);
