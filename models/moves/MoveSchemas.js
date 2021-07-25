import mongo from "../../services/mongodb.js";
import {Name, Description} from "../commonModels.js";
const Schema = mongo.Schema;
const {ObjectId} = Schema;
const jsonOptions = {
  virtuals: true,
};
const schemaOptions = {
  timestamp: true,
  versionKey: false,
};

const MoveAilment = new Schema(
  {
    moves: [
      {
        ref: "Move",
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
  schemaOptions,
);

const MoveBattleStyle = new Schema(
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
  },
  schemaOptions,
);

const MoveCategory = new Schema(
  {
    descriptions: [Description],
    moves: [
      {
        ref: "Move",
        type: ObjectId,
      },
    ],
    name: {
      required: true,
      type: String,
    },
    pokeapi_id: {
      required: true,
      type: Number,
    },
  },
  schemaOptions,
);

const MoveDamageClass = new Schema(
  {
    descriptions: [Description],
    moves: [
      {
        ref: "Move",
        type: ObjectId,
      },
    ],
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
  schemaOptions,
);

const MoveLearnMethod = new Schema(
  {
    descriptions: [Description],
    name: {
      required: true,
      type: String,
    },
    names: [Name],
    pokeapi_id: {
      required: true,
      type: Number,
    },
    version_groups: [
      {
        default: null,
        ref: "VersionGroup",
        type: ObjectId,
      },
    ],
  },
  schemaOptions,
);

const MoveTarget = new Schema(
  {
    descriptions: [Description],
    moves: [
      {
        ref: "Move",
        type: ObjectId,
      },
    ],
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
  schemaOptions,
);

MoveAilment.pre("save", (next) => next());
MoveBattleStyle.pre("save", (next) => next());
MoveCategory.pre("save", (next) => next());
MoveDamageClass.pre("save", (next) => next());
MoveLearnMethod.pre("save", (next) => next());
MoveTarget.pre("save", (next) => next());

MoveAilment.virtual("id").get(function () {
  return this._id;
});
MoveBattleStyle.virtual("id").get(function () {
  return this._id;
});
MoveCategory.virtual("id").get(function () {
  return this._id;
});
MoveDamageClass.virtual("id").get(function () {
  return this._id;
});
MoveLearnMethod.virtual("id").get(function () {
  return this._id;
});
MoveTarget.virtual("id").get(function () {
  return this._id;
});

MoveAilment.set("toJSON", jsonOptions);
MoveBattleStyle.set("toJSON", jsonOptions);
MoveCategory.set("toJSON", jsonOptions);
MoveDamageClass.set("toJSON", jsonOptions);
MoveLearnMethod.set("toJSON", jsonOptions);
MoveTarget.set("toJSON", jsonOptions);

export {
  MoveAilment,
  MoveBattleStyle,
  MoveCategory,
  MoveDamageClass,
  MoveLearnMethod,
  MoveTarget,
};
