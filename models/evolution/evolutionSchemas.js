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
const subSchemaOptions = {
  _id: false,
};

const EvolutionDetail = new Schema(
  {
    gender: {
      default: null,
      type: Number,
    },
    held_item: {
      default: null,
      ref: "Item",
      type: ObjectId,
    },
    item: {
      default: null,
      ref: "Item",
      type: ObjectId,
    },
    known_move: {
      default: null,
      ref: "Move",
      type: ObjectId,
    },
    known_move_type: {
      default: null,
      ref: "Type",
      type: ObjectId,
    },
    location: {
      default: null,
      ref: "Location",
      type: ObjectId,
    },
    min_affection: {
      default: null,
      type: Number,
    },
    min_beauty: {
      default: null,
      type: Number,
    },
    min_happiness: {
      default: null,
      type: Number,
    },
    min_level: {
      default: null,
      type: Number,
    },
    needs_overworld_rain: {
      default: false,
      type: Boolean,
    },
    party_species: {
      default: null,
      ref: "PokemonSpecies",
      type: ObjectId,
    },
    party_type: {
      default: null,
      ref: "Type",
      type: ObjectId,
    },
    relative_physical_stats: {
      default: null,
      type: Number,
    },
    time_of_day: {
      default: "",
      type: String,
    },
    trade_species: {
      default: null,
      ref: "PokemonSpecies",
      type: ObjectId,
    },
    trigger: {
      default: null,
      ref: "EvolutionTrigger",
      type: ObjectId,
    },
    turn_upside_down: {
      default: false,
      type: Boolean,
    },
  },
  subSchemaOptions,
);
const ChainLink = new Schema({}, subSchemaOptions);
ChainLink.add({
  evolution_details: [EvolutionDetail],
  evolves_to: [ChainLink],
  is_baby: {
    default: false,
    type: Boolean,
  },
  species: {
    default: null,
    ref: "PokemonSpecies",
    type: ObjectId,
  },
});
const EvolutionChain = new Schema(
  {
    baby_trigger_item: {
      default: null,
      ref: "Item",
      type: ObjectId,
    },
    chain: {
      default: null,
      type: ChainLink,
    },
    pokeapi_id: {
      required: true,
      type: Number,
    },
  },
  schemaOptions,
);

const EvolutionTrigger = new Schema(
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
    pokemon_species: [
      {
        default: null,
        ref: "PokemonSpecies",
        type: ObjectId,
      },
    ],
  },
  schemaOptions,
);

EvolutionChain.pre("save", (next) => next());
EvolutionTrigger.pre("save", (next) => next());

EvolutionChain.virtual("id").get(function () {
  return this._id;
});
EvolutionTrigger.virtual("id").get(function () {
  return this._id;
});

EvolutionChain.set("toJSON", jsonOptions);
EvolutionTrigger.set("toJSON", jsonOptions);

export {EvolutionChain, EvolutionTrigger};
