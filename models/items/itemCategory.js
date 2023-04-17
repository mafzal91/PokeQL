import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {ItemCategory as ItemCategorySchema} from "./itemSchemas.js";

class ItemCategory {
  static getItemCategories(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    return models.itemCategory
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getItemCategory(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.category) {
        id = parent.category;
      }
    }

    return models.itemCategory
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

ItemCategorySchema.loadClass(ItemCategory);

export default mongo.model("ItemCategory", ItemCategorySchema);
