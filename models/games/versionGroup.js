import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";

const Schema = mongo.Schema;
const {ObjectId} = Schema;

const VersionGroupSchema = new Schema(
  {
    generation: {
      ref: "Generation",
      required: true,
      type: ObjectId,
    },
    move_learn_methods: [
      {
        default: null,
        ref: "MoveLearnMethod",
        type: ObjectId,
      },
    ],
    name: {
      required: true,
      type: String,
    },
    order: {
      required: true,
      type: Number,
    },
    pokeapi_id: {
      required: true,
      type: Number,
    },
    pokedexes: [
      {
        default: null,
        ref: "Pokedex",
        type: ObjectId,
      },
    ],
    regions: [
      {
        default: null,
        ref: "Region",
        type: ObjectId,
      },
    ],
    versions: [
      {
        default: null,
        ref: "Version",
        type: ObjectId,
      },
    ],
  },
  {
    timestamp: true,
    versionKey: false,
  },
);

class VersionGroup {
  static getVersionGroups(parent, {query, skip, limit}, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent.version_groups) {
        query = {_id: {$in: parent.version_groups}};
      }
    }

    return Models.versionGroup
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getVersionGroup(parent, {id}, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.version_group) {
        id = parent.version_group;
      }
    }

    return Models.versionGroup
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

VersionGroupSchema.pre("save", function (next) {
  next();
});

VersionGroupSchema.virtual("id").get(function () {
  return this._id;
});

VersionGroupSchema.set("toJSON", {
  virtuals: true,
});

VersionGroupSchema.loadClass(VersionGroup);

export default mongo.model("VersionGroup", VersionGroupSchema);
