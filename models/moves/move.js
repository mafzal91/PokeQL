import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {
  VerboseEffect,
  FlavorText1,
  Name,
  MachineVersionDetail,
} from "../commonModels.js";
import {AbilityEffectChange} from "../pokemons/pokemonSchemas.js";
const Schema = mongo.Schema;
const ObjectId = Schema.ObjectId;

const ContestCombo = new Schema(
  {
    normal: {
      use_after: [
        {
          ref: "Move",
          type: ObjectId,
        },
      ],
      use_before: [
        {
          ref: "Move",
          type: ObjectId,
        },
      ],
    },
    super: {
      use_after: [
        {
          ref: "Move",
          type: ObjectId,
        },
      ],
      use_before: [
        {
          ref: "Move",
          type: ObjectId,
        },
      ],
    },
  },
  {_id: false},
);

const MoveMeta = new Schema(
  {
    ailment: {
      default: null,
      ref: "MoveAilment",
      type: ObjectId,
    },
    ailment_chance: {
      default: 0,
      type: Number,
    },
    category: {
      default: null,
      ref: "MoveCategory",
      type: ObjectId,
    },
    crit_rate: {
      default: 0,
      type: Number,
    },
    drain: {
      default: 0,
      type: Number,
    },
    flinch_chance: {
      default: 0,
      type: Number,
    },
    healing: {
      default: 0,
      type: Number,
    },
    max_hits: {
      default: 0,
      type: Number,
    },
    max_turns: {
      default: 0,
      type: Number,
    },
    min_hits: {
      default: 0,
      type: Number,
    },
    min_turns: {
      default: 0,
      type: Number,
    },
    stat_chance: {
      default: 0,
      type: Number,
    },
  },
  {_id: false},
);

const MovePastValue = new Schema(
  {
    accuracy: {
      default: 0,
      type: Number,
    },
    effect_chance: {
      default: 0,
      type: Number,
    },
    effect_entries: [VerboseEffect],
    power: {
      default: 0,
      type: Number,
    },
    pp: {
      default: 0,
      type: Number,
    },
    type: {
      default: null,
      ref: "Type",
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

const MoveStatChange = new Schema(
  {
    change: {
      default: 0,
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

const MoveSchema = new Schema(
  {
    accuracy: {
      default: 0,
      type: Number,
    },
    contest_combos: ContestCombo,
    contest_effect: {
      default: null,
      ref: "ContestEffect",
      type: ObjectId,
    },
    contest_type: {
      default: null,
      ref: "ContestType",
      type: ObjectId,
    },
    damage_class: {
      default: null,
      ref: "MoveDamageClass",
      type: ObjectId,
    },
    effect_chance: {
      default: 0,
      type: Number,
    },
    effect_changes: [AbilityEffectChange],
    effect_entries: [VerboseEffect],
    flavor_text_entries: [FlavorText1],
    generation: {
      default: null,
      ref: "Generation",
      type: ObjectId,
    },
    machines: [MachineVersionDetail],
    meta: MoveMeta,
    name: {
      required: true,
      type: String,
    },
    names: [Name],
    past_values: [MovePastValue],
    pokeapi_id: {
      required: true,
      type: Number,
    },
    power: {
      default: 0,
      type: Number,
    },
    pp: {
      default: 0,
      type: Number,
    },
    priority: {
      default: 0,
      type: Number,
    },
    stat_changes: [MoveStatChange],
    super_contest_effect: {
      default: null,
      ref: "SuperContestEffect",
      type: ObjectId,
    },
    target: {
      default: null,
      ref: "MoveTarget",
      type: ObjectId,
    },
    type: {
      default: null,
      ref: "Type",
      type: ObjectId,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  },
);

class Move {
  static getMoves(parent, {query, skip, limit}, Models, info) {
    const projection = getProjection(info);
    console.log(parent.moves);
    if (parent) {
      if (parent.moves) {
        query = {_id: {$in: parent.moves}};
      }
    }

    return Models.move
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getMove(parent, {id}, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.move) {
        id = parent.move;
      }
      if (parent.known_move) {
        id = parent.known_move;
      }
    }

    return Models.move
      .findById({_id: id})
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

MoveSchema.pre("save", function (next) {
  next();
});

MoveSchema.virtual("id").get(function () {
  return this._id;
});

MoveSchema.set("toJSON", {
  virtuals: true,
});

MoveSchema.loadClass(Move);

export default mongo.model("Move", MoveSchema);
