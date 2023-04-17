import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {ItemFlingEffect as ItemFlingEffectSchema} from "./itemSchemas.js";

class ItemFlingEffect {
  static getItemFlingEffects(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    let sort = {pokeapi_id: 1};

    return models.itemFlingEffect
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .then((data) => data)
      .catch((error) => error);
  }

  static getItemFlingEffect(parent, {id}, {models}, info) {
    const projection = getProjection(info);
    console.log(parent);
    if (parent) {
      // if (parent._id) { id = parent._id }
      if (parent.fling_effect) {
        id = parent.fling_effect;
      }
    }

    return models.itemFlingEffect
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

ItemFlingEffectSchema.loadClass(ItemFlingEffect);

export default mongo.model("ItemFlingEffect", ItemFlingEffectSchema);
