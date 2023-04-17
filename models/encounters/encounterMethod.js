import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {EncounterMethod as EncounterMethodSchema} from "./encounterSchemas.js";

class EncounterMethod {
  static getEncounterMethods(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    return models.encounterMethod
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getEncounterMethod(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.encounter_method) {
        id = parent.encounter_method;
      }
      if (parent.method) {
        id = parent.method;
      }
    }

    return models.encounterMethod
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

EncounterMethodSchema.loadClass(EncounterMethod);

export default mongo.model("EncounterMethod", EncounterMethodSchema);
