var mongo = require('../../services/mongodb');
var { Name, VersionEncounterDetail, GenerationGameIndex } = require('../commonModels')
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

var Location = new Schema({
  name:                   { type: String, required: true },
  pokeapi_id:             { type: Number, required: true },
  region:                 { type: ObjectId, ref: 'Region', default: null },
  names:                  [Name],
  game_indices:           [GenerationGameIndex],
  areas:                  [{ type: ObjectId, ref:"LocationArea", default: null}],
},schemaOptions);

var EncounterVersionDetails = new Schema({
  rate:                   {type: Number, required: true},
  version:                {type: ObjectId, ref:"Version", default: null},
},subSchemaOptions)
var EncounterMethodRate = new Schema({
  encounter_method:       {type: ObjectId, ref:"EncounterMethod", default: null},
  version_details:        [EncounterVersionDetails],
},subSchemaOptions)
var PokemonEncounter = new Schema({
  pokemon:                {type: ObjectId, ref:"Pokemon", default: null},
  version_details:        [VersionEncounterDetail],
},subSchemaOptions)
var LocationArea = new Schema({
  pokeapi_id:             {type: Number, required: true},
  name:                   {type: String, required: true},
  game_index:             {type: Number, default: null},
  encounter_method_rates: [EncounterMethodRate],
  location:               {type: ObjectId, ref:"Region", default: null},
  names:                  [Name],
  pokemon_encounters:     [PokemonEncounter],
}, schemaOptions)

var PalParkEncounterSpecies = new Schema({
  base_score:             {type: Number, required: true},
  rate:                   {type: Number, required: true},
  pokemon_species:        {type: ObjectId, ref:"PokemonSpecies", default: null},
},subSchemaOptions)
var PalParkArea = new Schema({
  pokeapi_id:             {type: Number, required: true},
  name:                   {type: String, required: true},
  names:                  [Name],
  pokemon_encounters:     [PalParkEncounterSpecies],
},schemaOptions)

var Region = new Schema({
  name:                   { type: String, required: true },
  pokeapi_id:             { type: Number, required: true },
  locations:              [{ type: ObjectId, ref: 'Location', }],
  main_generation:        { type: ObjectId, ref: 'Generation', default: null },
  names:                  [Name],
  pokedexes:              [{ type: ObjectId, ref: 'Pokedex', }],
  version_group:          [{ type: ObjectId, ref: 'VersionGroup', }],
}, schemaOptions);




module.exports = {
  Location,
  LocationArea,
  PalParkArea,
  Region,
}
