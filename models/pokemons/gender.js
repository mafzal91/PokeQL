import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";

import {Gender as GenderSchema} from "./pokemonSchemas.js";

class Gender {
  static getGenders(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent.genders) {
        query = {_id: {$in: parent.genders}};
      }
      if (parent.required_for_evolution) {
        query = {_id: {$in: parent.required_for_evolution}};
      }
    }

    return models.gender
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getGender(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
    }

    return models.gender
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

GenderSchema.loadClass(Gender);

export default mongo.model("Gender", GenderSchema);
