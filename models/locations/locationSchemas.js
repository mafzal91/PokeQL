import mongo from "../../services/mongodb.js";
import {
  Name,
  VersionEncounterDetail,
  GenerationGameIndex,
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

const Location = new Schema(
  {
    areas: [
      {
        default: null,
        ref: "LocationArea",
        type: ObjectId,
      },
    ],
    game_indices: [GenerationGameIndex],
    name: {
      required: true,
      type: String,
    },
    names: [Name],
    pokeapi_id: {
      required: true,
      type: Number,
    },
    region: {
      default: null,
      ref: "Region",
      type: ObjectId,
    },
  },
  schemaOptions,
);

const EncounterVersionDetails = new Schema(
  {
    rate: {
      required: true,
      type: Number,
    },
    version: {
      default: null,
      ref: "Version",
      type: ObjectId,
    },
  },
  subSchemaOptions,
);
const EncounterMethodRate = new Schema(
  {
    encounter_method: {
      default: null,
      ref: "EncounterMethod",
      type: ObjectId,
    },
    version_details: [EncounterVersionDetails],
  },
  subSchemaOptions,
);
const PokemonEncounter = new Schema(
  {
    pokemon: {
      default: null,
      ref: "Pokemon",
      type: ObjectId,
    },
    version_details: [VersionEncounterDetail],
  },
  subSchemaOptions,
);
const LocationArea = new Schema(
  {
    encounter_method_rates: [EncounterMethodRate],
    game_index: {
      default: null,
      type: Number,
    },
    location: {
      default: null,
      ref: "Location",
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
    pokemon_encounters: [PokemonEncounter],
  },
  schemaOptions,
);

const PalParkEncounterSpecies = new Schema(
  {
    base_score: {
      required: true,
      type: Number,
    },
    pokemon_species: {
      default: null,
      ref: "PokemonSpecies",
      type: ObjectId,
    },
    rate: {
      required: true,
      type: Number,
    },
  },
  subSchemaOptions,
);
const PalParkArea = new Schema(
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
    pokemon_encounters: [PalParkEncounterSpecies],
  },
  schemaOptions,
);

const Region = new Schema(
  {
    locations: [
      {
        ref: "Location",
        type: ObjectId,
      },
    ],
    main_generation: {
      default: null,
      ref: "Generation",
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
    pokedexes: [
      {
        ref: "Pokedex",
        type: ObjectId,
      },
    ],
    version_groups: [
      {
        ref: "VersionGroup",
        type: ObjectId,
      },
    ],
  },
  schemaOptions,
);

export {Location, LocationArea, PalParkArea, Region};
