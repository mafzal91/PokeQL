import mongo from "../services/mongodb.js";
const Schema = mongo.Schema;
const {ObjectId} = Schema;

export const Description = new Schema(
  {
    description: {
      default: "",
      type: String,
    },
    language: {
      default: null,
      ref: "Language",
      type: ObjectId,
    },
  },
  {_id: false},
);
export const Effect = new Schema(
  {
    effect: {
      default: "",
      type: String,
    },
    language: {
      default: null,
      ref: "Language",
      type: ObjectId,
    },
  },
  {_id: false},
);
export const Encounter = new Schema(
  {
    chance: {
      default: 0,
      type: Number,
    },
    condition_values: [
      {
        default: null,
        ref: "EncounterConditionValue",
        type: ObjectId,
      },
    ],
    max_level: {
      default: 0,
      type: Number,
    },
    method: {
      default: null,
      ref: "EncounterMethod",
      type: ObjectId,
    },
    min_level: {
      default: 0,
      type: Number,
    },
  },
  {_id: false},
);
export const FlavorText = new Schema(
  {
    flavor_text: {
      default: "",
      type: String,
    },
    language: {
      default: null,
      ref: "Language",
      type: ObjectId,
    },
  },
  {_id: false},
);
export const FlavorText1 = new Schema(
  {
    flavor_text: {
      default: "",
      type: String,
    },
    language: {
      default: null,
      ref: "Language",
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
export const VersionFlavorText = new Schema(
  {
    flavor_text: {
      default: "",
      type: String,
    },
    language: {
      default: null,
      ref: "Language",
      type: ObjectId,
    },
    version: {
      default: null,
      ref: "Version",
      type: ObjectId,
    },
  },
  {_id: false},
);
export const GenerationGameIndex = new Schema(
  {
    game_index: {
      default: 0,
      type: Number,
    },
    generation: {
      default: null,
      ref: "Generation",
      type: ObjectId,
    },
  },
  {_id: false},
);
export const MachineVersionDetail = new Schema(
  {
    machine: {
      default: null,
      ref: "Machine",
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
export const Name = new Schema(
  {
    language: {
      default: null,
      ref: "Language",
      type: ObjectId,
    },
    name: {
      default: "",
      type: String,
    },
  },
  {_id: false},
);
export const VerboseEffect = new Schema(
  {
    effect: {
      default: "",
      type: String,
    },
    language: {
      default: null,
      ref: "Language",
      type: ObjectId,
    },
    short_effect: {
      default: "",
      type: String,
    },
  },
  {_id: false},
);
export const VersionEncounterDetail = new Schema(
  {
    encounter_details: [Encounter],
    max_chance: {
      default: 0,
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
export const VersionGameIndex = new Schema(
  {
    game_index: {
      default: 0,
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
export const VersionGroupFlavorText = new Schema(
  {
    language: {
      default: null,
      ref: "Language",
      type: ObjectId,
    },
    text: {
      default: "",
      type: String,
    },
    version_group: {
      default: null,
      ref: "VersionGroup",
      type: ObjectId,
    },
  },
  {_id: false},
);
