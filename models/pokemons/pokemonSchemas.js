import mongo from "../../services/mongodb.js";
import {
  Description,
  Name,
  GenerationGameIndex,
  FlavorText1,
  VersionFlavorText,
  VerboseEffect,
  Effect,
} from "../commonModels.js";
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

const AbilityEffectChange = new Schema(
  {
    effect_entries: [Effect],
    version_group: {
      default: null,
      ref: "VersionGroup",
      type: ObjectId,
    },
  },
  subSchemaOptions,
);
const AbilityPokemon = new Schema(
  {
    is_hidden: {
      default: false,
      type: Boolean,
    },
    pokemon: {
      default: null,
      ref: "Pokemon",
      type: ObjectId,
    },
    slot: {
      default: null,
      type: Number,
    },
  },
  subSchemaOptions,
);
const Ability = new Schema(
  {
    effect_changes: [AbilityEffectChange],
    effect_entries: [VerboseEffect],
    flavor_text_entries: [FlavorText1],
    generation: {
      default: null,
      ref: "Generation",
      type: ObjectId,
    },
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
    pokemon: [AbilityPokemon],
  },
  schemaOptions,
);

const Characteristic = new Schema(
  {
    descriptions: [Description],
    gene_modulo: {
      default: false,
      type: Boolean,
    },
    pokeapi_id: {
      required: true,
      type: Number,
    },
    possible_values: [
      {
        default: null,
        type: Number,
      },
    ],
  },
  schemaOptions,
);

const EggGroup = new Schema(
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

const PokemonSpeciesGender = new Schema(
  {
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
const Gender = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    pokeapi_id: {
      required: true,
      type: Number,
    },
    pokemon_species_details: [PokemonSpeciesGender],
    required_for_evolution: [
      {
        default: null,
        ref: "PokemonSpecies",
        type: ObjectId,
      },
    ],
  },
  schemaOptions,
);

const GrowthRateExperienceLevel = new Schema(
  {
    experience: {
      default: null,
      type: Number,
    },
    level: {
      default: null,
      type: Number,
    },
  },
  subSchemaOptions,
);
const GrowthRate = new Schema(
  {
    descriptions: [Description],
    formula: {
      default: null,
      type: String,
    },
    levels: [GrowthRateExperienceLevel],
    name: {
      required: true,
      type: String,
    },
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

const NatureStatChange = new Schema(
  {
    max_change: {
      required: true,
      type: Number,
    },
    pokeathlon_stat: {
      default: null,
      ref: "PokeathlonStat",
      type: ObjectId,
    },
  },
  subSchemaOptions,
);
const MoveBattleStylePreference = new Schema(
  {
    high_hp_preference: {
      required: true,
      type: Number,
    },
    low_hp_preference: {
      required: true,
      type: Number,
    },
    move_battle_style: {
      default: null,
      ref: "MoveBattleStyle",
      type: ObjectId,
    },
  },
  subSchemaOptions,
);
const Nature = new Schema(
  {
    decreased_stat: {
      default: null,
      ref: "Stat",
      type: ObjectId,
    },
    hates_flavor: {
      default: null,
      ref: "BerryFlavor",
      type: ObjectId,
    },
    increased_stat: {
      default: null,
      ref: "Stat",
      type: ObjectId,
    },
    likes_flavor: {
      default: null,
      ref: "BerryFlavor",
      type: ObjectId,
    },
    move_battle_style_preferences: [MoveBattleStylePreference],
    name: {
      required: true,
      type: String,
    },
    names: [Name],
    pokeapi_id: {
      required: true,
      type: Number,
    },
    pokeathlon_stat_changes: [NatureStatChange],
  },
  schemaOptions,
);

const NaturePokeathlonStatAffect = new Schema(
  {
    max_change: {
      required: true,
      type: Number,
    },
    nature: {
      default: null,
      ref: "Nature",
      type: ObjectId,
    },
  },
  subSchemaOptions,
);
const NaturePokeathlonStatAffectSets = new Schema(
  {
    decrease: [NaturePokeathlonStatAffect],
    increase: [NaturePokeathlonStatAffect],
  },
  subSchemaOptions,
);
const PokeathlonStat = new Schema(
  {
    affecting_natures: {
      type: NaturePokeathlonStatAffectSets,
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
  },
  schemaOptions,
);

const PokemonColor = new Schema(
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

const PokemonFormSprites = new Schema(
  {
    back_default: {
      default: null,
      type: String,
    },
    back_shiny: {
      default: null,
      type: String,
    },
    front_default: {
      default: null,
      type: String,
    },
    front_shiny: {
      default: null,
      type: String,
    },
  },
  subSchemaOptions,
);
const PokemonForm = new Schema(
  {
    form_name: {
      default: null,
      type: String,
    },
    form_names: [Name],
    form_order: {
      default: null,
      type: Number,
    },
    is_battle_only: {
      default: false,
      type: Boolean,
    },
    is_default: {
      default: false,
      type: Boolean,
    },
    is_mega: {
      default: false,
      type: Boolean,
    },
    name: {
      required: true,
      type: String,
    },
    names: [Name],
    order: {
      default: null,
      type: Number,
    },
    pokeapi_id: {
      required: true,
      type: Number,
    },
    pokemon: {
      default: null,
      ref: "Pokemon",
      type: ObjectId,
    },
    sprites: {
      type: PokemonFormSprites,
    },
    version_group: {
      default: null,
      ref: "VersionGroup",
      type: ObjectId,
    },
  },
  schemaOptions,
);

const PokemonHabitat = new Schema(
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

const AwesomeName = new Schema(
  {
    awesome_name: {
      required: true,
      type: String,
    },
    language: {
      default: null,
      ref: "Language",
      type: ObjectId,
    },
  },
  subSchemaOptions,
);
const PokemonShape = new Schema(
  {
    awesome_names: [AwesomeName],
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

const Genus = new Schema(
  {
    genus: {
      required: true,
      type: String,
    },
    language: {
      default: null,
      ref: "Language",
      type: ObjectId,
    },
  },
  subSchemaOptions,
);
const PokemonSpeciesDexEntry = new Schema(
  {
    entry_number: {
      required: true,
      type: Number,
    },
    pokedex: {
      default: null,
      ref: "Pokedex",
      type: ObjectId,
    },
  },
  subSchemaOptions,
);
const PalParkEncounterArea = new Schema(
  {
    area: {
      default: null,
      ref: "PalParkArea",
      type: ObjectId,
    },
    base_score: {
      required: true,
      type: Number,
    },
    rate: {
      required: true,
      type: Number,
    },
  },
  subSchemaOptions,
);
const PokemonSpeciesVariety = new Schema(
  {
    is_default: {
      default: false,
      type: Boolean,
    },
    pokemon: {
      default: null,
      ref: "Pokemon",
      type: ObjectId,
    },
  },
  subSchemaOptions,
);
const PokemonSpecies = new Schema(
  {
    base_happiness: {
      default: null,
      type: Number,
    },
    capture_rate: {
      default: null,
      type: Number,
    },
    color: {
      default: null,
      ref: "PokemonColor",
      type: ObjectId,
    },
    constieties: [PokemonSpeciesVariety],
    egg_groups: [
      {
        default: null,
        ref: "EggGroup",
        type: ObjectId,
      },
    ],
    evolution_chain: {
      default: null,
      ref: "EvolutionChain",
      type: ObjectId,
    },
    evolves_from_species: {
      default: null,
      ref: "PokemonSpecies",
      type: ObjectId,
    },
    flavor_text_entries: [VersionFlavorText],
    form_descriptions: [Description],
    forms_switchable: {
      default: false,
      type: Boolean,
    },
    gender_rate: {
      default: null,
      type: Number,
    },
    genera: [Genus],
    generation: {
      default: null,
      ref: "Generation",
      type: ObjectId,
    },
    growth_rate: {
      default: null,
      ref: "GrowthRate",
      type: ObjectId,
    },
    habitat: {
      default: null,
      ref: "PokemonHabitat",
      type: ObjectId,
    },
    has_gender_differences: {
      default: false,
      type: Boolean,
    },
    hatch_counter: {
      default: null,
      type: Number,
    },
    is_baby: {
      default: false,
      type: Boolean,
    },
    name: {
      required: true,
      type: String,
    },
    names: [Name],
    order: {
      default: null,
      type: Number,
    },
    pal_park_encounters: [PalParkEncounterArea],
    pokeapi_id: {
      required: true,
      type: Number,
    },
    pokedex_numbers: [PokemonSpeciesDexEntry],
    shape: {
      default: null,
      ref: "PokemonShape",
      type: ObjectId,
    },
  },
  schemaOptions,
);

const MoveStatAffect = new Schema(
  {
    change: {
      required: true,
      type: Number,
    },
    move: {
      default: null,
      ref: "Move",
      type: ObjectId,
    },
  },
  subSchemaOptions,
);
const MoveStatAffectSets = new Schema(
  {
    decrease: [MoveStatAffect],
    increase: [MoveStatAffect],
  },
  subSchemaOptions,
);
const NatureStatAffectSets = new Schema(
  {
    decrease: [
      {
        default: null,
        ref: "Nature",
        type: ObjectId,
      },
    ],
    increase: [
      {
        default: null,
        ref: "Nature",
        type: ObjectId,
      },
    ],
  },
  subSchemaOptions,
);
const Stat = new Schema(
  {
    affecting_moves: MoveStatAffectSets,
    affecting_natures: NatureStatAffectSets,
    characteristics: [
      {
        default: null,
        ref: "Characteristic",
        type: ObjectId,
      },
    ],
    game_index: {
      default: null,
      type: String,
    },
    is_battle_only: {
      default: false,
      type: Boolean,
    },
    move_damage_class: {
      default: null,
      ref: "MoveDamageClass",
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
  },
  schemaOptions,
);

const TypePokemon = new Schema(
  {
    pokemon: {
      default: null,
      ref: "Pokemon",
      type: ObjectId,
    },
    slot: {
      default: null,
      type: Number,
    },
  },
  subSchemaOptions,
);
const DamageRelations = new Schema(
  {
    double_damage_from: [
      {
        default: null,
        ref: "Type",
        type: ObjectId,
      },
    ],
    double_damage_to: [
      {
        default: null,
        ref: "Type",
        type: ObjectId,
      },
    ],
    half_damage_from: [
      {
        default: null,
        ref: "Type",
        type: ObjectId,
      },
    ],
    half_damage_to: [
      {
        default: null,
        ref: "Type",
        type: ObjectId,
      },
    ],
    no_damage_from: [
      {
        default: null,
        ref: "Type",
        type: ObjectId,
      },
    ],
    no_damage_to: [
      {
        default: null,
        ref: "Type",
        type: ObjectId,
      },
    ],
  },
  subSchemaOptions,
);
const Type = new Schema(
  {
    damage_relations: DamageRelations,
    game_indices: [GenerationGameIndex],
    generation: {
      default: null,
      ref: "Generation",
      type: ObjectId,
    },
    move_damage_class: {
      default: null,
      ref: "MoveDamageClass",
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
    pokemon: [TypePokemon],
  },
  schemaOptions,
);

Ability.pre("save", (next) => next());
Characteristic.pre("save", (next) => next());
EggGroup.pre("save", (next) => next());
Gender.pre("save", (next) => next());
GrowthRate.pre("save", (next) => next());
Nature.pre("save", (next) => next());
PokeathlonStat.pre("save", (next) => next());
PokemonColor.pre("save", (next) => next());
PokemonForm.pre("save", (next) => next());
PokemonHabitat.pre("save", (next) => next());
PokemonShape.pre("save", (next) => next());
PokemonSpecies.pre("save", (next) => next());
Stat.pre("save", (next) => next());
Type.pre("save", (next) => next());

Ability.virtual("id").get(function () {
  return this._id;
});
Characteristic.virtual("id").get(function () {
  return this._id;
});
EggGroup.virtual("id").get(function () {
  return this._id;
});
Gender.virtual("id").get(function () {
  return this._id;
});
GrowthRate.virtual("id").get(function () {
  return this._id;
});
Nature.virtual("id").get(function () {
  return this._id;
});
PokeathlonStat.virtual("id").get(function () {
  return this._id;
});
PokemonColor.virtual("id").get(function () {
  return this._id;
});
PokemonForm.virtual("id").get(function () {
  return this._id;
});
PokemonHabitat.virtual("id").get(function () {
  return this._id;
});
PokemonShape.virtual("id").get(function () {
  return this._id;
});
PokemonSpecies.virtual("id").get(function () {
  return this._id;
});
Stat.virtual("id").get(function () {
  return this._id;
});
Type.virtual("id").get(function () {
  return this._id;
});

Ability.set("toJSON", jsonOptions);
Characteristic.set("toJSON", jsonOptions);
EggGroup.set("toJSON", jsonOptions);
Gender.set("toJSON", jsonOptions);
GrowthRate.set("toJSON", jsonOptions);
Nature.set("toJSON", jsonOptions);
PokeathlonStat.set("toJSON", jsonOptions);
PokemonColor.set("toJSON", jsonOptions);
PokemonForm.set("toJSON", jsonOptions);
PokemonHabitat.set("toJSON", jsonOptions);
PokemonShape.set("toJSON", jsonOptions);
PokemonSpecies.set("toJSON", jsonOptions);
Stat.set("toJSON", jsonOptions);
Type.set("toJSON", jsonOptions);

export {
  Ability,
  AbilityEffectChange,
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
};
