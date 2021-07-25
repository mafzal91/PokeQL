import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {
  Name,
  VersionEncounterDetail,
  GenerationGameIndex,
} from "../commonModels.js";
const Schema = mongo.Schema;
const ObjectId = Schema.ObjectId;
const jsonOptions = {
  virtuals: true,
};
const schemaOptions = {
  versionKey: false,
  timestamp: true,
};
const subSchemaOptions = {
  _id: false,
};

const Location = new Schema(
  {
    pokeapi_id: {type: Number, required: true},
    name: {type: String, required: true},
    region: {type: ObjectId, ref: "Region", default: null},
    names: [Name],
    game_indices: [GenerationGameIndex],
    areas: [{type: ObjectId, ref: "LocationArea", default: null}],
  },
  schemaOptions,
);

const EncounterVersionDetails = new Schema(
  {
    rate: {type: Number, required: true},
    version: {type: ObjectId, ref: "Version", default: null},
  },
  subSchemaOptions,
);
const EncounterMethodRate = new Schema(
  {
    encounter_method: {type: ObjectId, ref: "EncounterMethod", default: null},
    version_details: [EncounterVersionDetails],
  },
  subSchemaOptions,
);
const PokemonEncounter = new Schema(
  {
    pokemon: {type: ObjectId, ref: "Pokemon", default: null},
    version_details: [VersionEncounterDetail],
  },
  subSchemaOptions,
);
const LocationArea = new Schema(
  {
    pokeapi_id: {type: Number, required: true},
    name: {type: String, required: true},
    game_index: {type: Number, default: null},
    encounter_method_rates: [EncounterMethodRate],
    location: {type: ObjectId, ref: "Location", default: null},
    names: [Name],
    pokemon_encounters: [PokemonEncounter],
  },
  schemaOptions,
);

const PalParkEncounterSpecies = new Schema(
  {
    base_score: {type: Number, required: true},
    rate: {type: Number, required: true},
    pokemon_species: {type: ObjectId, ref: "PokemonSpecies", default: null},
  },
  subSchemaOptions,
);
const PalParkArea = new Schema(
  {
    pokeapi_id: {type: Number, required: true},
    name: {type: String, required: true},
    names: [Name],
    pokemon_encounters: [PalParkEncounterSpecies],
  },
  schemaOptions,
);

const Region = new Schema(
  {
    name: {type: String, required: true},
    pokeapi_id: {type: Number, required: true},
    locations: [{type: ObjectId, ref: "Location"}],
    main_generation: {type: ObjectId, ref: "Generation", default: null},
    names: [Name],
    pokedexes: [{type: ObjectId, ref: "Pokedex"}],
    version_groups: [{type: ObjectId, ref: "VersionGroup"}],
  },
  schemaOptions,
);

export default {
  Location,
  LocationArea,
  PalParkArea,
  Region,
};
