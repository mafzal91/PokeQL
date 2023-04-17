import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {Effect, FlavorText} from "../commonModels.js";
const Schema = mongo.Schema;

const ContestEffectSchema = new Schema(
  {
    appeal: {
      default: null,
      type: Number,
    },
    effect_entries: {
      default: [],
      type: [Effect],
    },
    flavor_text_entries: {
      default: [],
      type: [FlavorText],
    },
    jam: {
      default: null,
      type: Number,
    },
    pokeapi_id: {
      default: 0,
      type: Number,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  },
);

class ContestEffect {
  static getContestEffects(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    return models.contestEffect
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getContestEffect(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.contest_effect) {
        id = parent.contest_effect;
      }
    }

    return models.contestEffect
      .findById({_id: id})
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

ContestEffectSchema.pre("save", (next) => next());

ContestEffectSchema.virtual("id").get(function () {
  return this._id;
});

ContestEffectSchema.set("toJSON", {
  virtuals: true,
});

ContestEffectSchema.loadClass(ContestEffect);

export default mongo.model("ContestEffect", ContestEffectSchema);
