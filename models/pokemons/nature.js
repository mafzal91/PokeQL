import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";

const NatureSchema = require("./pokemonSchemas").Nature;

class Nature {
  static getNatures(parent, {query, skip, limit}, Models, info) {
    const projection = getProjection(info);
    return Models.nature
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getNature(parent, {id}, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.nature) {
        id = parent.nature;
      }
    }

    return Models.nature
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

NatureSchema.loadClass(Nature);

export default mongo.model("Nature", NatureSchema);
