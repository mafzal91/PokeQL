import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {VersionGameIndex, VersionEncounterDetail} from "../commonModels.js";

const Schema = mongo.Schema;
const ObjectId = Schema.ObjectId;

const LocationAreaEncounter = new Schema(
  {
    location_area: {
      default: null,
      ref: "LocationArea",
      type: ObjectId,
    },
    version_details: [VersionEncounterDetail],
  },
  {_id: false},
);
const PokemonSprites = new Schema(
  {
    back_default: {
      default: null,
      type: String,
    },
    back_female: {
      default: null,
      type: String,
    },
    back_shiny: {
      default: null,
      type: String,
    },
    back_shiny_female: {
      default: null,
      type: String,
    },
    front_default: {
      default: null,
      type: String,
    },
    front_female: {
      default: null,
      type: String,
    },
    front_shiny: {
      default: null,
      type: String,
    },
    front_shiny_female: {
      default: null,
      type: String,
    },
  },
  {_id: false},
);
const PokemonStat = new Schema(
  {
    base_stat: {
      default: null,
      type: Number,
    },
    effort: {
      default: null,
      type: Number,
    },
    stat: {
      default: null,
      ref: "Stat",
      type: ObjectId,
    },
  },
  {_id: false},
);
const PokemonMoveVersion = new Schema(
  {
    level_learned_at: {
      default: null,
      type: Number,
    },
    move_learn_method: {
      default: null,
      ref: "MoveLearnMethod",
      type: ObjectId,
    },
    version_group: {
      default: null,
      ref: "VersionGroup",
      type: ObjectId,
    },
  },
  {_id: false},
);
const PokemonMove = new Schema(
  {
    move: {
      default: null,
      ref: "Move",
      type: ObjectId,
    },
    version_group_details: [PokemonMoveVersion],
  },
  {_id: false},
);
const PokemonHeldItemVersion = new Schema(
  {
    rarity: {
      default: null,
      type: Number,
    },
    version: {
      default: null,
      ref: "Version",
      type: ObjectId,
    },
  },
  {_id: false},
);
const PokemonHeldItem = new Schema(
  {
    item: {
      default: null,
      ref: "Item",
      type: ObjectId,
    },
    version_details: [PokemonHeldItemVersion],
  },
  {_id: false},
);
const PokemonType = new Schema(
  {
    slot: {
      default: null,
      type: Number,
    },
    type: {
      default: null,
      ref: "Type",
      type: ObjectId,
    },
  },
  {_id: false},
);
const PokemonAbility = new Schema(
  {
    ability: {
      default: null,
      ref: "Ability",
      type: ObjectId,
    },
    is_hidden: {
      default: false,
      type: Boolean,
    },
    slot: {
      default: null,
      type: Number,
    },
  },
  {_id: false},
);
const PokemonSchema = new Schema(
  {
    abilities: [PokemonAbility],
    base_experience: {
      default: null,
      type: Number,
    },
    forms: [
      {
        default: null,
        ref: "PokemonForm",
        type: ObjectId,
      },
    ],
    game_indices: [VersionGameIndex],
    height: {
      default: null,
      type: Number,
    },
    held_items: [PokemonHeldItem],
    is_default: {
      default: false,
      type: Boolean,
    },
    location_area_encounters: [LocationAreaEncounter],
    moves: [PokemonMove],
    name: {
      required: true,
      type: String,
    },
    order: {
      default: null,
      type: Number,
    },
    pokeapi_id: {
      required: true,
      type: Number,
    },
    species: {
      default: null,
      ref: "PokemonSpecies",
      type: ObjectId,
    },
    sprites: PokemonSprites,
    stats: [PokemonStat],
    types: [PokemonType],
    weight: {
      default: null,
      type: Number,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  },
);

class Pokemon {
  static getPokemons(parent, {query, skip, limit}, Models, info) {
    const projection = getProjection(info);
    console.log(projection);

    return Models.pokemon
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getPokemon(parent, {id}, Models, info) {
    const projection = getProjection(info);
    console.log(parent);
    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.pokemon) {
        id = parent.pokemon;
      }
    }

    return Models.pokemon
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }

  static getStats(parent, {query = {}}, Models, info, field) {
    const projection = getProjection(info);
    console.log(parent);
    console.log(projection);
    console.log(field);

    if (parent) {
      Object.keys(projection).forEach((key) => {
        query._id = {$in: parent[field].map((i) => Models.type.ObjectId(i))};
      });
    }

    return Models.type
      .find(query)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

PokemonSchema.pre("save", function (next) {
  console.log("heyyyo");
  const currentDate = new Date();
  this.updated_at = currentDate;
  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate;

  next();
});

PokemonSchema.virtual("id").get(function () {
  return this._id;
});

PokemonSchema.set("toJSON", {
  virtuals: true,
});

PokemonSchema.loadClass(Pokemon);

export default mongo.model("Pokemon", PokemonSchema);
