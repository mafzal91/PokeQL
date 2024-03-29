import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {EggGroup as EggGroupSchema} from "./pokemonSchemas.js";

class EggGroup {
  static getEggGroups(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent.egg_groups) {
        query = {_id: {$in: parent.egg_groups}};
      }
    }

    return models.eggGroup
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getEggGroup(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.egg_group) {
        id = parent.egg_group;
      }
    }

    return models.eggGroup
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

EggGroupSchema.loadClass(EggGroup);

export default mongo.model("EggGroup", EggGroupSchema);
