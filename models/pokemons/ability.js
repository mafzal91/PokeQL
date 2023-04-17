import mongo from "../../services/mongodb.js";
import {Ability as AbilitySchema} from "./pokemonSchemas.js";
import {getProjection} from "../../utils/index.js";

class Ability {
  static getAbilities(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);
    // console.log(projection)

    return models.ability
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getAbility(parent, id, {models}, info) {
    const projection = getProjection(info);
    console.log(parent, projection);
    console.log("############");
    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.ability) {
        id = parent.ability;
      }
    }

    return models.ability
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

AbilitySchema.pre("save", function (next) {
  next();
});

AbilitySchema.virtual("id").get(function () {
  return this._id;
});

AbilitySchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
  },
  virtuals: true,
});

AbilitySchema.loadClass(Ability);

export default mongo.model("Ability", AbilitySchema);
