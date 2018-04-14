var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var { Name } = require('../commonModels')
var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;
var jsonOptions = {
  virtuals: true,
}
var schemaOptions = {
  versionKey: false,
  timestamp: true
}
var subSchemaOptions = {
  _id: false
}

var EvolutionDetail = new Schema({
  item:                       { type: ObjectId, ref: "Item", default: null },
  trigger:                    { type: ObjectId, ref: "EvolutionTrigger", default: null },
  gender:                     { type: Number, default: null },
  held_item:                  { type: ObjectId, ref: "Item", default: null },
  known_move:                 { type: ObjectId, ref: "Move", default: null },
  known_move_type:            { type: ObjectId, ref: "Type", default: null },
  location:                   { type: ObjectId, ref: "Location", default: null },
  min_level:                  { type: Number, default: null },
  min_happiness:              { type: Number, default: null },
  min_beauty:                 { type: Number, default: null },
  min_affection:              { type: Number, default: null },
  needs_overworld_rain:       { type: Boolean, default: false },
  party_species:              { type: ObjectId, ref: "PokemonSpecies", default: null },
  party_type:                 { type: ObjectId, ref: "Type", default: null },
  relative_physical_stats:    { type: Number, default: null },
  time_of_day:                { type: String, default: "" },
  trade_species:              { type: ObjectId, ref: "PokemonSpecies", default: null },
  turn_upside_down:           { type: Boolean, default: false },
}, subSchemaOptions);
var ChainLink = new Schema({}, subSchemaOptions)
ChainLink.add({
  is_baby:                    { type: Boolean, default: false },
  species:                    { type: ObjectId, ref: "PokemonSpecies", default: null },
  evolution_details:          [EvolutionDetail],
  evolves_to:                 [ChainLink],
});
var EvolutionChain = new Schema({
  pokeapi_id:                 { type: Number, required: true },
  baby_trigger_item:          { type: ObjectId, ref: "Item", default: null },
  chain:                      { type: ChainLink, default: null},
}, schemaOptions);

var EvolutionTrigger = new Schema({
  pokeapi_id:                 { type: Number, required: true },
  name:                       { type: String, required: true },
  names:                      [Name],
  pokemon_species:            [{ type: ObjectId, ref: "PokemonSpecies", default: null },]
}, schemaOptions);

EvolutionChain.pre('save',(next)=>next());
EvolutionTrigger.pre('save',(next)=>next());

EvolutionChain.virtual('id').get(function() {
  return this._id
});
EvolutionTrigger.virtual('id').get(function() {
  return this._id
});

EvolutionChain.set('toJSON', jsonOptions);
EvolutionTrigger.set('toJSON', jsonOptions);


module.exports = {
  EvolutionChain,
  EvolutionTrigger,
}
