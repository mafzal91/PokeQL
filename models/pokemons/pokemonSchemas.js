var mongo = require('../../services/mongodb');
var { Description, Name, GenerationGameIndex, FlavorText1, FlavorText, VersionFlavorText, VerboseEffect, Effect } = require('../commonModels')
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

var AbilityEffectChange = new Schema({
  effect_entries:          [Effect],
  version_group:           { type: ObjectId, ref: 'VersionGroup', default: null },
},subSchemaOptions)
var AbilityPokemon = new Schema({
  is_hidden:               { type: Boolean, default: false },
  slot:                    { type: Number, default: null },
  pokemon:                 { type: ObjectId, ref:"Pokemon", default: null }
},subSchemaOptions)
var Ability = new Schema({
  pokeapi_id:              { type: Number, required: true },
  name:                    { type: String, required: true },
  is_main_series:          { type: Boolean, default: false },
  generation:              { type: ObjectId, ref: 'Generation', default: null },
  names:                   [Name],
  effect_entries:          [VerboseEffect],
  effect_changes:          [AbilityEffectChange],
  flavor_text_entries:     [FlavorText1],
  pokemon:                 [AbilityPokemon],
}, schemaOptions);

var Characteristic = new Schema({
  pokeapi_id:           {type: Number, required: true},
  gene_modulo:          {type: Boolean, default: false},
  possible_values:      [{type: Number, default: null}],
  descriptions:         [Description],
}, schemaOptions);

var EggGroup = new Schema({
  pokeapi_id:           {type: Number, required: true},
  name:                 {type: String, required: true},
  names:                [Name],
  pokemon_species:      [{type: ObjectId, ref:"PokemonSpecies", default: null}],
}, schemaOptions);

var PokemonSpeciesGender = new Schema({
  rate:                    {type: Number, required: true},
  pokemon_species:         {type: ObjectId, ref:"PokemonSpecies", default: null},
},subSchemaOptions)
var Gender = new Schema({
  pokeapi_id:              {type: Number, required: true},
  name:                    {type: String, required: true},
  pokemon_species_details: [PokemonSpeciesGender],
  required_for_evolution:  [{type: ObjectId, ref:"PokemonSpecies", default: null}],
},schemaOptions)

var GrowthRateExperienceLevel = new Schema({
  level:                  {type: Number, default: null},
  experience:             {type: Number, default: null},
},subSchemaOptions)
var GrowthRate = new Schema({
  pokeapi_id:             {type: Number, required: true},
  name:                   {type: String, required: true},
  formula:                {type: String, default: null},
  descriptions:           [Description],
  levels:                 [GrowthRateExperienceLevel],
  pokemon_species:        [{type: ObjectId, ref:"PokemonSpecies", default: null}],
},schemaOptions)


var NatureStatChange = new Schema({
  max_change:             {type: Number, required: true},
  pokeathlon_stat:        {type: ObjectId, ref:"PokeathlonStat", default: null},
},subSchemaOptions)
var MoveBattleStylePreference = new Schema({
  low_hp_preference:      {type: Number, required: true},
  high_hp_preference:     {type: Number, required: true},
  move_battle_style:      {type: ObjectId, ref:"MoveBattleStyle", default: null}
},subSchemaOptions)
var Nature = new Schema({
  pokeapi_id:             {type: Number, required: true},
  name:                   {type: String, required: true},
  decreased_stat:         {type: ObjectId, ref:"Stat", default: null},
  increased_stat:         {type: ObjectId, ref:"Stat", default: null},
  hates_flavor:           {type: ObjectId, ref:"BerryFlavor", default: null},
  likes_flavor:           {type: ObjectId, ref:"BerryFlavor", default: null},
  pokeathlon_stat_changes:[NatureStatChange],
  move_battle_style_preferences: [MoveBattleStylePreference],
  names:                  [Name],
},schemaOptions)


var NaturePokeathlonStatAffect = new Schema({
  max_change:             {type: Number, required: true},
  nature:                 {type: ObjectId, ref:"Nature", default: null},
},subSchemaOptions);
var NaturePokeathlonStatAffectSets = new Schema({
  increase:               [NaturePokeathlonStatAffect],
  decrease:               [NaturePokeathlonStatAffect],
},subSchemaOptions);
var PokeathlonStat =  new Schema({
  pokeapi_id:             {type: Number, required: true},
  name:                   {type: String, required: true},
  names:                  [Name],
  affecting_natures:      {type: NaturePokeathlonStatAffectSets}
},schemaOptions);

var PokemonColor =  new Schema({
  pokeapi_id:             {type: Number, required: true},
  name:                   {type: String, required: true},
  names:                  [Name],
  pokemon_species:        [{type: ObjectId, ref:"PokemonSpecies", default: null}],
},schemaOptions);

var PokemonFormSprites = new Schema({
  front_default:            {type: String, default: null},
  front_shiny:              {type: String, default: null},
  back_default:             {type: String, default: null},
  back_shiny:               {type: String, default: null},
}, subSchemaOptions)
var PokemonForm = new Schema({
  pokeapi_id:             {type: Number, required: true},
  name:                   {type: String, required: true},
  order:                  {type: Number, default: null},
  form_order:             {type: Number, default: null},
  is_default:             {type: Boolean, default: false},
  is_battle_only:         {type: Boolean, default: false},
  is_mega:                {type: Boolean, default: false},
  form_name:              {type: String, default: null},
  pokemon:                {type: ObjectId, ref:"Pokemon", default: null},
  sprites:                {type: PokemonFormSprites },
  version_group:          {type: ObjectId, ref:"VersionGroup", default: null},
  names:                  [Name],
  form_names:             [Name],
}, schemaOptions)

var PokemonHabitat =  new Schema({
  pokeapi_id:             {type: Number, required: true},
  name:                   {type: String, required: true},
  names:                  [Name],
  pokemon_species:        [{type: ObjectId, ref:"PokemonSpecies", default: null}],
},schemaOptions);

var AwesomeName = new Schema({
  awesome_name:           {type: String, required: true},
  language:               {type: ObjectId, ref:"Language", default: null},
},subSchemaOptions)
var PokemonShape =  new Schema({
  pokeapi_id:             {type: Number, required: true},
  name:                   {type: String, required: true},
  names:                  [Name],
  pokemon_species:        [{type: ObjectId, ref:"PokemonSpecies", default: null}],
  awesome_names:          [AwesomeName],
},schemaOptions);

var Genus = new Schema({
  genus:                          {type: String, required: true},
  language:                       {type: ObjectId, ref:"Language", default: null},
},subSchemaOptions)
var PokemonSpeciesDexEntry = new Schema({
  entry_number:                   {type: Number, required: true},
  pokedex:                        {type: ObjectId, ref:"Pokedex", default: null},
},subSchemaOptions)
var PalParkEncounterArea = new Schema({
  base_score:                     {type: Number, required: true},
  rate:                           {type: Number, required: true},
  area:                           {type: ObjectId, ref:"PalParkArea", default: null},
},subSchemaOptions)
var PokemonSpeciesVariety = new Schema({
  is_default:                     {type: Boolean, default: false},
  pokemon:                        {type: ObjectId, ref:"Pokemon", default: null},
},subSchemaOptions)
var PokemonSpecies = new Schema({
  pokeapi_id:                     {type: Number, required: true},
  name:                           {type: String, required: true},
  order:                          {type: Number, default: null},
  gender_rate:                    {type: Number, default: null},
  capture_rate:                   {type: Number, default: null},
  base_happiness:                 {type: Number, default: null},
  is_baby:                        {type: Boolean, default: false},
  hatch_counter:                  {type: Number, default: null},
  has_gender_differences:         {type: Boolean, default: false},
  forms_switchable:               {type: Boolean, default: false},
  growth_rate:                    {type: ObjectId, ref:"GrowthRate", default: null},
  pokedex_numbers:                [PokemonSpeciesDexEntry],
  egg_groups:                     [{type: ObjectId, ref:"EggGroup", default: null}],
  color:                          {type: ObjectId, ref:"PokemonColor", default: null},
  shape:                          {type: ObjectId, ref:"PokemonShape", default: null},
  evolves_from_species:           {type: ObjectId, ref:"PokemonSpecies", default: null},
  evolution_chain:                {type: ObjectId, ref:"EvolutionChain", default: null},
  habitat:                        {type: ObjectId, ref:"PokemonHabitat", default: null},
  generation:                     {type: ObjectId, ref:"Generation", default: null},
  names:                          [Name],
  pal_park_encounters:            [PalParkEncounterArea],
  flavor_text_entries:            [VersionFlavorText],
  form_descriptions:              [Description],
  genera:                         [Genus],
  varieties:                      [PokemonSpeciesVariety],
},schemaOptions)


var MoveStatAffect = new Schema({
  change:                 { type: Number, required: true },
  move:                   {type: ObjectId, ref:"Move", default: null}
},subSchemaOptions)
var MoveStatAffectSets = new Schema({
  increase:               [MoveStatAffect],
  decrease:               [MoveStatAffect],
},subSchemaOptions)
var NatureStatAffectSets = new Schema({
  increase:               [{type: ObjectId, ref:"Nature", default: null}],
  decrease:               [{type: ObjectId, ref:"Nature", default: null}],
},subSchemaOptions)
var Stat = new Schema({
  pokeapi_id:              { type: Number, required: true },
  name:                    { type: String, required: true },
  game_index:              { type: String, default: null },
  is_battle_only:          { type: Boolean, default: false },
  affecting_moves:         MoveStatAffectSets,
  affecting_natures:       NatureStatAffectSets,
  characteristics:         [{type: ObjectId, ref:"Characteristic", default: null}],
  move_damage_class:       {type: ObjectId, ref:"MoveDamageClass", default: null},
  names:                   [Name],
}, schemaOptions);


var TypePokemon = new Schema({
  slot:                    {type: Number, default: null},
  pokemon:                 {type: ObjectId, ref: 'Pokemon', default: null},
},subSchemaOptions)
var DamageRelations = new Schema({
  half_damage_from:    [{type: ObjectId, ref: 'Type', default: null}],
  no_damage_from:      [{type: ObjectId, ref: 'Type', default: null}],
  half_damage_to:      [{type: ObjectId, ref: 'Type', default: null}],
  double_damage_from:  [{type: ObjectId, ref: 'Type', default: null}],
  no_damage_to:        [{type: ObjectId, ref: 'Type', default: null}],
  double_damage_to:    [{type: ObjectId, ref: 'Type', default: null}],
},subSchemaOptions)
var Type = new Schema({
  pokeapi_id:              {type: Number, required: true},
  name:                    {type: String, required: true},
  damage_relations:        DamageRelations,
  game_indices:            [GenerationGameIndex],
  generation:              {type: ObjectId, ref: "Generation", default: null},
  move_damage_class:       {type: ObjectId, ref: "MoveDamageClass", default: null},
  names:                   [Name],
  pokemon:                 [TypePokemon],
  moves:                   [{ type: ObjectId, ref: 'Move', default: null}],
}, schemaOptions);

Ability.pre('save',(next)=>next())
Characteristic.pre('save',(next)=>next());
EggGroup.pre('save',(next)=>next());
Gender.pre('save',(next)=>next());
GrowthRate.pre('save',(next)=>next());
Nature.pre('save',(next)=>next());
PokeathlonStat.pre('save',(next)=>next());
PokemonColor.pre('save',(next)=>next());
PokemonForm.pre('save',(next)=>next());
PokemonHabitat.pre('save',(next)=>next());
PokemonShape.pre('save',(next)=>next());
PokemonSpecies.pre('save',(next)=>next());
Stat.pre('save',(next)=>next());
Type.pre('save',(next)=>next());

Ability.virtual('id').get(()=>this._id);
Characteristic.virtual('id').get(()=>this._id);
EggGroup.virtual('id').get(()=>this._id);
Gender.virtual('id').get(()=>this._id);
GrowthRate.virtual('id').get(()=>this._id);
Nature.virtual('id').get(()=>this._id);
PokeathlonStat.virtual('id').get(()=>this._id);
PokemonColor.virtual('id').get(()=>this._id);
PokemonForm.virtual('id').get(()=>this._id);
PokemonHabitat.virtual('id').get(()=>this._id);
PokemonShape.virtual('id').get(()=>this._id);
PokemonSpecies.virtual('id').get(()=>this._id);
Stat.virtual('id').get(()=>this._id);
Type.virtual('id').get(()=>this._id);

Ability.set('toJSON', jsonOptions);
Characteristic.set('toJSON', jsonOptions);
EggGroup.set('toJSON', jsonOptions);
Gender.set('toJSON', jsonOptions);
GrowthRate.set('toJSON', jsonOptions);
Nature.set('toJSON', jsonOptions);
PokeathlonStat.set('toJSON', jsonOptions);
PokemonColor.set('toJSON', jsonOptions);
PokemonForm.set('toJSON', jsonOptions);
PokemonHabitat.set('toJSON', jsonOptions);
PokemonShape.set('toJSON', jsonOptions);
PokemonSpecies.set('toJSON', jsonOptions);
Stat.set('toJSON', jsonOptions);
Type.set('toJSON', jsonOptions);


module.exports = {
  Ability,
  Characteristic,
  EggGroup,
  Gender,
  GrowthRate,
  Nature,
  PokeathlonStat,
  PokemonColor,
  PokemonForm,
  PokemonHabitat,
  PokemonShape,
  PokemonSpecies,
  Stat,
  Type,
}

module.exports.subSchema = {
  AbilityEffectChange,
}
// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
