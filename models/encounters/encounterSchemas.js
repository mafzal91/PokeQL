import mongo from "../../services/mongodb.js";
import {Name} from "../commonModels.js";
const Schema = mongo.Schema;
const {ObjectId} = Schema;
const jsonOptions = {
  virtuals: true,
};
const schemaOptions = {
  timestamp: true,
  versionKey: false,
};

const EncounterMethod = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    names: [Name],
    order: {
      default: null,
      type: Number,
    },
    pokeapi_id: {
      required: true,
      type: Number,
    },
  },
  schemaOptions,
);

const EncounterCondition = new Schema(
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
    values: [
      {
        default: null,
        ref: "EncounterConditionValue",
        type: ObjectId,
      },
    ],
  },
  schemaOptions,
);

const EncounterConditionValue = new Schema(
  {
    condition: {
      default: null,
      ref: "EncounterCondition",
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
  schemaOptions,
);

EncounterMethod.pre("save", (next) => next());
EncounterCondition.pre("save", (next) => next());
EncounterConditionValue.pre("save", (next) => next());

EncounterMethod.virtual("id").get(function () {
  return this._id;
});
EncounterCondition.virtual("id").get(function () {
  return this._id;
});
EncounterConditionValue.virtual("id").get(function () {
  return this._id;
});

EncounterMethod.set("toJSON", jsonOptions);
EncounterCondition.set("toJSON", jsonOptions);
EncounterConditionValue.set("toJSON", jsonOptions);

export {EncounterCondition, EncounterConditionValue, EncounterMethod};
