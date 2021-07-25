import mongo from "../../services/mongodb.js";
import {Name} from "../commonModels.js";
const Schema = mongo.Schema;
const ObjectId = Schema.ObjectId;
import {getProjection} from "../../utils/index.js";

const FlavorBerry = new Schema(
  {
    berry: {
      default: null,
      ref: "Berry",
      type: ObjectId,
    },
    potency: {
      required: true,
      type: Number,
    },
  },
  {_id: false},
);

const BerryFlavorSchema = new Schema(
  {
    berries: [FlavorBerry],
    contest_type: {
      default: null,
      ref: "ContestType",
      type: ObjectId,
    },
    name: {
      required: true,
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

class BerryFlavor {
  static getBerryFlavors(parent, {query, skip, limit}, Models, info) {
    const projection = getProjection(info);
    console.log("berry flavor", projection);

    return Models.berryFlavor
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getBerryFlavor(parent, {id}, Models, info) {
    const projection = getProjection(info);
    console.log(parent);
    if (parent) {
      if (parent.id) {
        id = parent._id;
      }
      if (parent.flavor) {
        id = parent.flavor;
      }
      if (parent.berry_flavor) {
        id = parent.berry_flavor;
      }
      if (parent.hates_flavor) {
        id = parent.hates_flavor;
      }
      if (parent.likes_flavor) {
        id = parent.likes_flavor;
      }
    }

    return Models.berryFlavor
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

BerryFlavorSchema.pre("save", (next) => next());

BerryFlavorSchema.virtual("id").get(function () {
  return this._id;
});

BerryFlavorSchema.set("toJSON", {
  virtuals: true,
});

BerryFlavorSchema.loadClass(BerryFlavor);

export default mongo.model("BerryFlavor", BerryFlavorSchema);
