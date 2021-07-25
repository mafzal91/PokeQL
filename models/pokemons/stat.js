import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {Stat as StatSchema} from "./pokemonSchemas.js";

class Stat {
  static getStats(parent, {query, skip, limit}, Models, info) {
    const projection = getProjection(info);
    console.log(projection);

    if (parent) {
      if (parent.increase) {
        query = {_id: {$in: parent.increase}};
      }
      if (parent.decrease) {
        query = {_id: {$in: parent.decrease}};
      }
    }

    return Models.stat
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getStat(parent, id, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.stat) {
        id = parent.stat;
      }
    }

    return Models.stat
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

StatSchema.pre("save", function (next) {
  next();
});

StatSchema.virtual("id").get(function () {
  return this._id;
});

StatSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
  },
  virtuals: true,
});

StatSchema.loadClass(Stat);

export default mongo.model("Stat", StatSchema);
