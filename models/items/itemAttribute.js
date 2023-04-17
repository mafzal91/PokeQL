import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {ItemAttribute as ItemAttributeSchema} from "./itemSchemas.js";

class ItemAttribute {
  static getItemAttributes(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {
      models.itemAttribute
        .find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .sort({pokeapi_id: 1})
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  static getItemAttribute(parent, {id}, {models}, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {
      if (parent) {
        if (parent._id) {
          id = parent._id;
        }
      }

      models.itemAttribute
        .findById(id)
        .select(projection)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}

ItemAttributeSchema.loadClass(ItemAttribute);

export default mongo.model("ItemAttribute", ItemAttributeSchema);
