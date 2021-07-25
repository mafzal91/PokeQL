import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {Name, Description} from "../commonModels.js";
const Schema = mongo.Schema;
const ObjectId = Schema.ObjectId;
const jsonOptions = {
  virtuals: true,
};
const schemaOptions = {
  versionKey: false,
  timestamp: true,
};

const MoveAilment = new Schema(
  {
    pokeapi_id: {type: Number, required: true},
    name: {type: String, default: ""},
    names: [Name],
    moves: [{type: ObjectId, ref: "Move"}],
  },
  schemaOptions,
);

const MoveBattleStyle = new Schema(
  {
    pokeapi_id: {type: Number, required: true},
    name: {type: String, required: true},
    names: [Name],
  },
  schemaOptions,
);

const MoveCategory = new Schema(
  {
    pokeapi_id: {type: Number, required: true},
    name: {type: String, required: true},
    moves: [{type: ObjectId, ref: "Move"}],
    descriptions: [Description],
  },
  schemaOptions,
);

const MoveDamageClass = new Schema(
  {
    pokeapi_id: {type: Number, required: true},
    name: {type: String, required: true},
    descriptions: [Description],
    moves: [{type: ObjectId, ref: "Move"}],
    names: [Name],
  },
  schemaOptions,
);

const MoveLearnMethod = new Schema(
  {
    pokeapi_id: {type: Number, required: true},
    name: {type: String, required: true},
    descriptions: [Description],
    names: [Name],
    version_groups: [{type: ObjectId, ref: "VersionGroup", default: null}],
  },
  schemaOptions,
);

const MoveTarget = new Schema(
  {
    pokeapi_id: {type: Number, required: true},
    name: {type: String, required: true},
    descriptions: [Description],
    moves: [{type: ObjectId, ref: "Move"}],
    names: [Name],
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

export default {
  MoveAilment,
  MoveBattleStyle,
  MoveCategory,
  MoveDamageClass,
  MoveLearnMethod,
  MoveTarget,
};
