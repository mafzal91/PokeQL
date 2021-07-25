import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {Name} from "../commonModels.js";

const Schema = mongo.Schema;
const {ObjectId} = Schema;

const VersionSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    names: [Name],
    pokeapi_id: {
      required: true,
      type: Number,
    },
    version_group: {
      default: null,
      ref: "VersionGroup",
      type: ObjectId,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  },
);

class Version {
  static getVersions(parent, {query, skip, limit}, Models, info) {
    const projection = getProjection(info);

    return Models.version
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getVersion(parent, id, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      // if (parent._id) {id = parent._id}
      if (parent.version) {
        id = parent.version;
      }
    }

    return Models.version
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

VersionSchema.pre("save", function (next) {
  next();
});

VersionSchema.virtual("id").get(function () {
  return this._id;
});

VersionSchema.set("toJSON", {
  virtuals: true,
});

VersionSchema.loadClass(Version);

export default mongo.model("Version", VersionSchema);
