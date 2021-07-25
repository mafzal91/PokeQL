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
const ObjectId = Schema.ObjectId;
const jsonOptions = {
  virtuals: true,
  transform: (doc, ret, options) => delete ret._id,
};
const schemaOptions = {
  versionKey: false,
  timestamp: true,
};
const subSchemaOptions = {
  _id: false,
};

const ItemHolderPokemonVersionDetail = new Schema(
  {
    rarity: {type: String, default: null},
    version: {type: ObjectId, ref: "Version", default: null},
  },
  subSchemaOptions,
);
const ItemHolderPokemon = new Schema(
  {
    pokemon: {type: ObjectId, ref: "Pokemon", default: null},
    version_details: {type: [ItemHolderPokemonVersionDetail], default: []},
  },
  subSchemaOptions,
);
const ItemSprites = new Schema(
  {
    default: {type: String, default: null},
  },
  subSchemaOptions,
);
const Item = new Schema(
  {
    pokeapi_id: {type: Number, required: true},
    name: {type: String, required: true},
    cost: {type: Number, default: null},
    fling_power: {type: Number, default: null},
    fling_effect: {type: ObjectId, ref: "ItemFlingEffect", default: null},
    attributes: [{type: ObjectId, ref: "ItemAttribute", default: null}],
    category: {type: ObjectId, ref: "ItemCategory", default: null},
    effect_entries: [VerboseEffect],
    flavor_text_entries: [VersionGroupFlavorText],
    game_indices: [GenerationGameIndex],
    names: [Name],
    sprites: ItemSprites,
    held_by_pokemon: [ItemHolderPokemon],
    baby_trigger_for: {type: ObjectId, ref: "EvolutionChain", default: null},
    machines: [MachineVersionDetail],
  },
  schemaOptions,
);

const ItemAttribute = new Schema(
  {
    pokeapi_id: {type: Number, required: true},
    name: {type: String, required: true},
    items: [{type: ObjectId, ref: "Item", default: null}],
    names: [Name],
    descriptions: [Description],
  },
  schemaOptions,
);

const ItemCategory = new Schema(
  {
    pokeapi_id: {type: Number, required: true},
    name: {type: String, required: true},
    items: [{type: ObjectId, ref: "Item", default: null}],
    names: [Name],
    pocket: {type: ObjectId, ref: "ItemPocket", default: null},
  },
  schemaOptions,
);

const ItemFlingEffect = new Schema(
  {
    pokeapi_id: {type: Number, required: true},
    name: {type: String, required: true},
    effect_entries: [Effect],
    items: [{type: ObjectId, ref: "Item", default: null}],
  },
  schemaOptions,
);

const ItemPocket = new Schema(
  {
    pokeapi_id: {type: Number, required: true},
    name: {type: String, required: true},
    categories: [{type: ObjectId, ref: "ItemCategory", default: null}],
    names: [Name],
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

export default {
  Item,
  ItemAttribute,
  ItemCategory,
  ItemFlingEffect,
  ItemPocket,
};
