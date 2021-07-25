import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
const Schema = mongo.Schema;
const {ObjectId} = Schema;

const ContestName = new Schema(
  {
    color: {
      default: "",
      type: String,
    },
    language: {
      default: null,
      ref: "Language",
      type: ObjectId,
    },
    name: {
      default: "",
      type: String,
    },
  },
  {_id: false},
);

const ContestTypeSchema = new Schema(
  {
    berry_flavor: {
      default: null,
      ref: "BerryFlavor",
      type: ObjectId,
    },
    name: {
      required: true,
      type: String,
    },
    names: [ContestName],
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

class ContestType {
  static getContestTypes(parent, {query, skip, limit}, Models, info) {
    const projection = getProjection(info);

    return Models.contestType
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getContestType(parent, {id}, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.contest_type) {
        id = parent.contest_type;
      }
    }

    return Models.contestType
      .findById({_id: id})
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

ContestTypeSchema.pre("save", (next) => next());

ContestTypeSchema.virtual("id").get(function () {
  return this._id;
});

ContestTypeSchema.set("toJSON", {
  virtuals: true,
});

ContestTypeSchema.loadClass(ContestType);

export default mongo.model("ContestType", ContestTypeSchema);
