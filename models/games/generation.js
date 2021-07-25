import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {Name} from "../commonModels.js";

const Schema = mongo.Schema;
const {ObjectId} = Schema;

const GenerationSchema = new Schema(
  {
    abilities: [
      {
        default: null,
        ref: "Ability",
        type: ObjectId,
      },
    ],
    main_region: {
      default: null,
      ref: "Region",
      type: ObjectId,
    },
    moves: [
      {
        default: null,
        ref: "Move",
        type: ObjectId,
      },
    ],
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
    types: [
      {
        default: null,
        ref: "Types",
        type: ObjectId,
      },
    ],
    version_groups: [
      {
        default: null,
        ref: "VersionGroups",
        type: ObjectId,
      },
    ],
  },
  {
    timestamp: true,
    versionKey: false,
  },
);

class Generation {
  static getGenerations(parent, {query, skip, limit}, Models, info) {
    const projection = getProjection(info);

    return Models.generation
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getGeneration(parent, {id}, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent.generation) {
        id = parent.generation;
      }
      if (parent.main_generation) {
        id = parent.main_generation;
      }
    }

    return Models.generation
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

// Generation.pre('save', function(next) {
//   next();
// });
//
// Generation.virtual('id').get(function () {
//   return this._id;
// });

GenerationSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
  },
  virtuals: true,
});

GenerationSchema.loadClass(Generation);

export default mongo.model("Generation", GenerationSchema);
