import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
const Schema = mongo.Schema;
const {ObjectId} = Schema;

const BerryFlavor = new Schema(
  {
    flavor: {
      default: null,
      ref: "BerryFlavor",
      type: ObjectId,
    },
    potency: {
      required: true,
      type: Number,
    },
  },
  {_id: false},
);

const BerrySchema = new Schema(
  {
    firmness: {
      default: null,
      ref: "BerryFirmness",
      type: ObjectId,
    },
    flavors: {
      default: [],
      type: [BerryFlavor],
    },
    growth_time: {
      default: null,
      type: Number,
    },
    item: {
      default: null,
      ref: "Item",
      type: ObjectId,
    },
    max_harvest: {
      default: null,
      type: Number,
    },
    name: {
      required: true,
      type: String,
    },
    natural_gift_power: {
      default: null,
      type: Number,
    },
    natural_gift_type: {
      default: null,
      ref: "Type",
      type: ObjectId,
    },
    pokeapi_id: {
      required: true,
      type: Number,
    },
    size: {
      default: null,
      type: Number,
    },
    smoothness: {
      default: null,
      type: Number,
    },
    soil_dryness: {
      default: null,
      type: Number,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  },
);

class Berry {
  static getBerries(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);
    console.log(projection);

    return models.berry
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getBerry(parent, {id}, {models}, info) {
    const projection = getProjection(info);
    console.log("Berry parent", parent);
    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.berry) {
        id = parent.berry;
      }
    }

    return models.berry
      .findById(id)
      .select(projection)
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => error);
  }
}

BerrySchema.pre("save", (next) => next());

BerrySchema.virtual("id").get(function () {
  return this._id;
});

BerrySchema.set("toJSON", {
  virtuals: true,
});

BerrySchema.loadClass(Berry);

export default mongo.model("Berry", BerrySchema);
