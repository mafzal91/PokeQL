import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
const Schema = mongo.Schema;
const {ObjectId} = Schema;

const MachineSchema = new Schema(
  {
    item: {
      default: null,
      ref: "Item",
      type: ObjectId,
    },
    move: {
      default: null,
      ref: "Move",
      type: ObjectId,
    },
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

class Machine {
  static getMachines(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    return models.machine
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getMachine(parent, {id}, {models}, info) {
    const projection = getProjection(info);
    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.machine) {
        id = parent.machine;
      }
    }

    return models.machine
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

MachineSchema.pre("save", function (next) {
  next();
});

MachineSchema.virtual("id").get(function () {
  return this._id;
});

MachineSchema.set("toJSON", {
  virtuals: true,
});

MachineSchema.loadClass(Machine);

export default mongo.model("Machine", MachineSchema);
