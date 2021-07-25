import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {FlavorText} from "../commonModels.js";
const Schema = mongo.Schema;
const ObjectId = Schema.ObjectId;

const SuperContestEffectSchema = new Schema(
  {
    appeal: {
      default: null,
      type: Number,
    },
    flavor_text_entries: [FlavorText],
    moves: [
      {
        default: null,
        ref: "Move",
        type: ObjectId,
      },
    ],
    pokeapi_id: {
      required: true,
      type: Number,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  },
);

class SuperContestEffect {
  static getSuperContestEffects(parent, {query, skip, limit}, Models, info) {
    const projection = getProjection(info);

    return Models.superContestEffect
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getSuperContestEffect(parent, {id}, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.super_contest_effect) {
        id = parent.super_contest_effect;
      }
    }

    return Models.superContestEffect
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

SuperContestEffectSchema.pre("save", (next) => next());

SuperContestEffectSchema.virtual("id").get(function () {
  return this._id;
});

SuperContestEffectSchema.set("toJSON", {
  virtuals: true,
});

SuperContestEffectSchema.loadClass(SuperContestEffect);

export default mongo.model("SuperContestEffect", SuperContestEffectSchema);
