import mongo from "../../services/mongodb.js";
import {
  Description,
  Name,
  GenerationGameIndex,
  Effect,
  MachineVersionDetail,
  VerboseEffect,
  VersionGroupFlavorText,
} from "../commonModels.js";

const Schema = mongo.Schema;
const {ObjectId} = Schema;

const schemaOptions = {
  timestamp: true,
  versionKey: false,
};
const subSchemaOptions = {
  _id: false,
};

const ItemHolderPokemonVersionDetail = new Schema(
  {
    rarity: {
      default: null,
      type: String,
    },
    version: {
      default: null,
      ref: "Version",
      type: ObjectId,
    },
  },
  subSchemaOptions,
);
const ItemHolderPokemon = new Schema(
  {
    pokemon: {
      default: null,
      ref: "Pokemon",
      type: ObjectId,
    },
    version_details: {
      default: [],
      type: [ItemHolderPokemonVersionDetail],
    },
  },
  subSchemaOptions,
);
const ItemSprites = new Schema(
  {
    default: {
      default: null,
      type: String,
    },
  },
  subSchemaOptions,
);
const Item = new Schema(
  {
    attributes: [
      {
        default: null,
        ref: "ItemAttribute",
        type: ObjectId,
      },
    ],
    baby_trigger_for: {
      default: null,
      ref: "EvolutionChain",
      type: ObjectId,
    },
    category: {
      default: null,
      ref: "ItemCategory",
      type: ObjectId,
    },
    cost: {
      default: null,
      type: Number,
    },
    effect_entries: [VerboseEffect],
    flavor_text_entries: [VersionGroupFlavorText],
    fling_effect: {
      default: null,
      ref: "ItemFlingEffect",
      type: ObjectId,
    },
    fling_power: {
      default: null,
      type: Number,
    },
    game_indices: [GenerationGameIndex],
    held_by_pokemon: [ItemHolderPokemon],
    machines: [MachineVersionDetail],
    name: {
      required: true,
      type: String,
    },
    names: [Name],
    pokeapi_id: {
      required: true,
      type: Number,
    },
    sprites: ItemSprites,
  },
  schemaOptions,
);

const ItemAttribute = new Schema(
  {
    descriptions: [Description],
    items: [
      {
        default: null,
        ref: "Item",
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

const ItemCategory = new Schema(
  {
    items: [
      {
        default: null,
        ref: "Item",
        type: ObjectId,
      },
    ],
    name: {
      required: true,
      type: String,
    },
    names: [Name],
    pocket: {
      default: null,
      ref: "ItemPocket",
      type: ObjectId,
    },
    pokeapi_id: {
      required: true,
      type: Number,
    },
  },
  schemaOptions,
);

const ItemFlingEffect = new Schema(
  {
    effect_entries: [Effect],
    items: [
      {
        default: null,
        ref: "Item",
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

const ItemPocket = new Schema(
  {
    categories: [
      {
        default: null,
        ref: "ItemCategory",
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

Item.pre("save", (next) => next());
ItemAttribute.pre("save", (next) => next());
ItemCategory.pre("save", (next) => next());
ItemFlingEffect.pre("save", (next) => next());
ItemPocket.pre("save", (next) => next());

Item.virtual("id").get(function () {
  return this._id;
});
ItemAttribute.virtual("id").get(function () {
  return this._id;
});
ItemCategory.virtual("id").get(function () {
  return this._id;
});
ItemFlingEffect.virtual("id").get(function () {
  return this._id;
});
ItemPocket.virtual("id").get(function () {
  return this._id;
});

Item.set("toJSON", subSchemaOptions);
ItemAttribute.set("toJSON", subSchemaOptions);
ItemCategory.set("toJSON", subSchemaOptions);
ItemFlingEffect.set("toJSON", subSchemaOptions);
ItemPocket.set("toJSON", subSchemaOptions);

export {Item, ItemAttribute, ItemCategory, ItemFlingEffect, ItemPocket};
