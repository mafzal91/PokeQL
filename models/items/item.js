import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";

import {Item as ItemSchema} from "./itemSchemas.js";

class Item {
  static getItems(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    /** WIP */
    // let id;
    // if (parent) {
    //   if (parent._id) {
    //     id = parent._id;
    //   }
    //   if (parent.item) {
    //     id = parent.item;
    //   }
    //   if (parent.baby_trigger_item) {
    //     id = parent.baby_trigger_item;
    //   }
    //   if (parent.held_item) {
    //     id = parent.held_item;
    //   }
    // }

    return models.item
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getItem(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    //TODO fix to select the id for the correct file when parent has for multiple fields of the same type
    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.item) {
        id = parent.item;
      }
      if (parent.baby_trigger_item) {
        id = parent.baby_trigger_item;
      }
      if (parent.held_item) {
        id = parent.held_item;
      }
    }

    console.log(parent.item);
    console.log(id);
    console.log("__________________________________");

    return models.item
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

ItemSchema.pre("save", (next) => next());

ItemSchema.virtual("id").get(function () {
  return this._id;
});

ItemSchema.set("toJSON", {
  virtuals: true,
});

ItemSchema.loadClass(Item);

export default mongo.model("Item", ItemSchema);
