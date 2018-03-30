var mongo = require('../../services/mongodb');
var { Description, Name, GenerationGameIndex, Effect, MachineVersionDetail,VerboseEffect, FlavorText1,VersionGroupFlavorText } = require('../commonModels')

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;
var jsonOptions = {
  virtuals: true,
  transform: (doc, ret, options) => delete ret._id,
}
var schemaOptions = {
  versionKey: false,
  timestamp: true
}
var subSchemaOptions = {
  _id: false
}


var ItemHolderPokemonVersionDetail = new Schema({
  rarity:                 { type: String, default: null },
  version:                { type: ObjectId, ref: "Version", default: null },
}, subSchemaOptions);
var ItemHolderPokemon = new Schema({
  pokemon:                { type: ObjectId, ref: "Pokemon", default: null },
  version_details:        { type: [ItemHolderPokemonVersionDetail], default: [] }
}, subSchemaOptions);
var ItemSprites = new Schema({
  default:                { type: String, default: null }
}, subSchemaOptions);
var Item = new Schema({
  pokeapi_id:             { type: Number, required: true },
  name:                   { type: String, required: true },
  cost:                   { type: Number, default: null },
  fling_power:            { type: Number, default: null },
  fling_effect:           { type: ObjectId, ref: 'ItemFlingEffect', default: null },
  attributes:             [{ type: ObjectId, ref: 'ItemAttribute', default: null }],
  category:               { type: ObjectId, ref: 'ItemCategory', default: null },
  effect_entries:         [VerboseEffect],
  flavor_text_entries:    [VersionGroupFlavorText],
  game_indices:           [GenerationGameIndex],
  names:                  [Name],
  sprites:                ItemSprites,
  held_by_pokemon:        [ItemHolderPokemon],
  baby_trigger_for:       { type: ObjectId, ref: 'EvolutionChain', default: null },
  machines:               [MachineVersionDetail]
}, schemaOptions);




var ItemAttribute = new Schema({
  pokeapi_id:              { type: Number, required: true },
  name:                    { type: String, required: true },
  items:                   [{type: ObjectId, ref: "Item", default: null}],
  names:                   [Name],
  descriptions:            [Description],
}, schemaOptions);

var ItemCategory = new Schema({
  pokeapi_id:              { type: Number, required: true },
  name:                    { type: String, required: true },
  items:                   [{type: ObjectId, ref: "Item", default: null}],
  names:                   [Name],
  pocket:                  {type: ObjectId, ref: "ItemPocket", default: null},
}, schemaOptions);

var ItemFlingEffect = new Schema({
  pokeapi_id:              { type: Number, required: true },
  name:                    { type: String, required: true },
  effect_entries:          [Effect],
  items:                   [{type: ObjectId, ref: "Item", default: null}],
}, schemaOptions);

var ItemPocket = new Schema({
  pokeapi_id:              { type: Number, required: true },
  name:                    { type: String, required: true },
  categories:              [{type: ObjectId, ref: "Category", default: null}],
  names:                   [Name],
}, schemaOptions);


Item.pre('save', next => next())
ItemAttribute.pre('save', next => next())
ItemCategory.pre('save', next => next())
ItemFlingEffect.pre('save', next => next())
ItemPocket.pre('save', next => next())

Item.virtual('id').get(() => this._id);
ItemAttribute.virtual('id').get(() => this._id);
ItemCategory.virtual('id').get(() => this._id);
ItemFlingEffect.virtual('id').get(() => this._id);
ItemPocket.virtual('id').get(() => this._id);

Item.set('toJSON', subSchemaOptions);
ItemAttribute.set('toJSON', subSchemaOptions);
ItemCategory.set('toJSON', subSchemaOptions);
ItemFlingEffect.set('toJSON', subSchemaOptions);
ItemPocket.set('toJSON', subSchemaOptions);


module.exports = {
  Item,
  ItemAttribute,
  ItemCategory,
  ItemFlingEffect,
  ItemPocket,
}
