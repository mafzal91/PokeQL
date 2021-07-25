import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {Description, Name} from "../commonModels.js";

const Schema = mongo.Schema;
const {ObjectId} = Schema;

const PokemonEntry = new Schema(
  {
    entry_number: {
      required: true,
      type: Number,
    },
    pokemon_species: {
      default: null,
      ref: "PokemonSpecies",
      type: ObjectId,
    },
  },
  {
    _id: false,
  },
);

const PokedexSchema = new Schema(
  {
    descriptions: [Description],
    is_main_series: {
      default: false,
      type: Boolean,
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
    pokemon_entries: [PokemonEntry],
    region: {
      default: null,
      ref: "Region",
      type: ObjectId,
    },
    version_groups: [
      {
        default: null,
        ref: "VersionGroup",
        type: ObjectId,
      },
    ],
  },
  {
    timestamp: true,
    versionKey: false,
  },
);

class Pokedex {
  static getPokedexes(parent, {query, skip, limit}, Models, info) {
    const projection = getProjection(info);
    // console.log(projection)

    if (parent) {
      if (parent.pokedexes) {
        query = {_id: {$in: parent.pokedexes}};
      }
    }

    return Models.pokedex
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getPokedex(parent, {id}, Models, info) {
    const projection = getProjection(info);
    if (parent) {
      if (parent._id) {
        id = parent.id;
      }
      if (parent.pokedex) {
        id = parent.pokedex;
      }
    }
    return Models.pokedex
      .findById({_id: id})
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

PokedexSchema.pre("save", function (next) {
  next();
});

PokedexSchema.virtual("id").get(function () {
  return this._id;
});

PokedexSchema.set("toJSON", {
  virtuals: true,
});

PokedexSchema.loadClass(Pokedex);

export default mongo.model("Pokedex", PokedexSchema);
