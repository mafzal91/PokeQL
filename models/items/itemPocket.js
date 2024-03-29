import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {ItemPocket as ItemPocketSchema} from "./itemSchemas.js";

class ItemPocket {
  static getItemPockets(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    return models.itemPocket
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getItemPocket(parent, {id}, {models}, info) {
    const projection = getProjection(info);
    console.log(parent);
    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.pocket) {
        id = parent.pocket;
      }
    }

    return models.itemPocket
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

ItemPocketSchema.loadClass(ItemPocket);

export default mongo.model("ItemPocket", ItemPocketSchema);
