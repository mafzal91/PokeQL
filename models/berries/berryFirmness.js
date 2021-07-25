import mongo from "../../services/mongodb.js";
import {Name} from "../commonModels.js";
const Schema = mongo.Schema;
const ObjectId = Schema.ObjectId;
import {getProjection} from "../../utils/index.js";

const BerryFirmnessSchema = new Schema(
  {
    berries: [
      {
        default: null,
        ref: "Berry",
        type: ObjectId,
      },
    ],
    name: {
      default: "",
      type: String,
    },
    names: [Name],
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

class BerryFirmness {
  static getBerryFirmnesses(parent, {query, skip, limit}, Models, info) {
    const projection = getProjection(info);

    return Models.berryFirmness
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getBerryFirmness(parent, {id}, Models, info) {
    const projection = getProjection(info);
    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.firmness) {
        id = parent.firmness;
      }
    }

    return Models.berryFirmness
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

BerryFirmnessSchema.pre("save", (next) => next());

BerryFirmnessSchema.virtual("id").get(function () {
  return this._id;
});

BerryFirmnessSchema.set("toJSON", {
  virtuals: true,
});

BerryFirmnessSchema.loadClass(BerryFirmness);

export default mongo.model("BerryFirmness", BerryFirmnessSchema);
