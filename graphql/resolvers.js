import * as models from "../models/index.js";

import berry from "./resolvers/berry.js";
import contest from "./resolvers/contest.js";
import encounter from "./resolvers/encounter.js";
import evolution from "./resolvers/evolution.js";
import game from "./resolvers/game.js";
import item from "./resolvers/item.js";
import location from "./resolvers/location.js";
import machine from "./resolvers/machine.js";
import move from "./resolvers/move.js";
import pokemon from "./resolvers/pokemon.js";
import commonModels from "./resolvers/commonModels.js";

export default {
  Query: {
    Abilities: models.ability.getAbilities,
    Ability: models.ability.getAbility,
    Berries: models.berry.getBerries,
    Berry: models.berry.getBerry,
    BerryFirmness: models.berryFirmness.getBerryFirmness,
    BerryFirmnesses: models.berryFirmness.getBerryFirmnesses,
    BerryFlavor: models.berryFlavor.getBerryFlavor,
    BerryFlavors: models.berryFlavor.getBerryFlavors,
    Characteristic: models.characteristic.getCharacteristic,
    Characteristics: models.characteristic.getCharacteristics,
    ContestEffect: models.contestEffect.getContestEffect,
    ContestEffects: models.contestEffect.getContestEffects,
    ContestType: models.contestType.getContestType,
    ContestTypes: models.contestType.getContestTypes,
    EggGroup: models.eggGroup.getEggGroup,
    EggGroups: models.eggGroup.getEggGroups,
    EncounterCondition: models.encounterCondition.getEncounterCondition,
    EncounterConditionValue:
      models.encounterConditionValue.getEncounterConditionValue,
    EncounterConditionValues:
      models.encounterConditionValue.getEncounterConditionValues,
    EncounterConditions: models.encounterCondition.getEncounterConditions,
    EncounterMethod: models.encounterMethod.getEncounterMethod,
    EncounterMethods: models.encounterMethod.getEncounterMethods,
    EvolutionChain: models.evolutionChain.getEvolutionChain,
    EvolutionChains: models.evolutionChain.getEvolutionChains,
    EvolutionTrigger: models.evolutionTrigger.getEvolutionTrigger,
    EvolutionTriggers: models.evolutionTrigger.getEvolutionTriggers,
    Gender: models.gender.getGender,
    Genders: models.gender.getGenders,
    Generation: models.generation.getGeneration,
    Generations: models.generation.getGenerations,
    GrowthRate: models.growthRate.getGrowthRate,
    GrowthRates: models.growthRate.getGrowthRates,
    Item: models.item.getItem,
    ItemAttribute: models.itemAttribute.getItemAttribute,
    ItemAttributes: models.itemAttribute.getItemAttributes,
    ItemCategories: models.itemCategory.getItemCategories,
    ItemCategory: models.itemCategory.getItemCategory,
    ItemFlingEffect: models.itemFlingEffect.getItemFlingEffect,
    ItemFlingEffects: models.itemFlingEffect.getItemFlingEffects,
    ItemPocket: models.itemPocket.getItemPocket,
    ItemPockets: models.itemPocket.getItemPockets,
    Items: models.item.getItems,
    Language: models.language.getLanguage,
    Languages: models.language.getLanguages,
    Location: models.location.getLocation,
    LocationArea: models.locationArea.getLocationArea,
    LocationAreas: models.locationArea.getLocationAreas,
    Locations: models.location.getLocations,
    Machine: models.machine.getMachine,
    Machines: models.machine.getMachines,
    Move: models.move.getMove,
    MoveAilment: models.moveAilment.getMoveAilment,
    MoveAilments: models.moveAilment.getMoveAilments,
    MoveBattleStyle: models.moveBattleStyle.getMoveBattleStyle,
    MoveBattleStyles: models.moveBattleStyle.getMoveBattleStyles,
    MoveCategories: models.moveCategory.getMoveCategories,
    MoveCategory: models.moveCategory.getMoveCategory,
    MoveDamageClass: models.moveDamageClass.getMoveDamageClass,
    MoveDamageClasses: models.moveDamageClass.getMoveDamageClasses,
    MoveLearnMethod: models.moveLearnMethod.getMoveLearnMethod,
    MoveLearnMethods: models.moveLearnMethod.getMoveLearnMethods,
    MoveTarget: models.moveTarget.getMoveTarget,
    MoveTargets: models.moveTarget.getMoveTargets,
    Moves: models.move.getMoves,
    Nature: models.nature.getNature,
    Natures: models.nature.getNatures,
    PalParkArea: models.palParkArea.getPalParkArea,
    PalParkAreas: models.palParkArea.getPalParkAreas,
    PokeathlonStat: models.pokeathlonStat.getPokeathlonStat,
    PokeathlonStats: models.pokeathlonStat.getPokeathlonStats,
    Pokedex: models.pokedex.getPokedex,
    Pokedexes: models.pokedex.getPokedexes,
    Pokemon: models.pokemon.getPokemon,
    PokemonColor: models.pokemonColor.getPokemonColor,
    PokemonColors: models.pokemonColor.getPokemonColors,
    PokemonForm: models.pokemonForm.getPokemonForm,
    PokemonForms: models.pokemonForm.getPokemonForms,
    PokemonHabitat: models.pokemonHabitat.getPokemonHabitat,
    PokemonHabitats: models.pokemonHabitat.getPokemonHabitats,
    PokemonShape: models.pokemonShape.getPokemonShape,
    PokemonShapes: models.pokemonShape.getPokemonShapes,
    PokemonSpecies: models.pokemonSpecies.getPokemonSpecies,
    PokemonSpeciess: models.pokemonSpecies.getPokemonSpeciess,
    Pokemons: models.pokemon.getPokemons,
    Region: models.region.getRegion,
    Regions: models.region.getRegions,
    Stat: models.stat.getStat,
    Stats: models.stat.getStats,
    SuperContestEffect: models.superContestEffect.getSuperContestEffect,
    SuperContestEffects: models.superContestEffect.getSuperContestEffects,
    Type: models.type.getType,
    Types: models.type.getTypes,
    Version: models.version.getVersion,
    VersionGroup: models.versionGroup.getVersionGroup,
    VersionGroups: models.versionGroup.getVersionGroups,
    Versions: models.version.getVersions,
  },
  ...berry,
  ...commonModels,
  ...contest,
  ...encounter,
  ...evolution,
  ...game,
  ...item,
  ...location,
  ...machine,
  ...move,
  ...pokemon,

  // Type: {
  //   generation: models.generation.getGeneration
  // },

  // DamageRelations:{
  //   half_damage_from: (parent, query, { models}, info) => models.type.getDamageRelations(parent, query, { models}, info, 'half_damage_from'),
  //   no_damage_from: (parent, query, { models}, info) => models.type.getDamageRelations(parent, query, { models}, info, 'no_damage_from'),
  //   half_damage_to: (parent, query, { models}, info) => models.type.getDamageRelations(parent, query, { models}, info, 'half_damage_to'),
  //   double_damage_from:(parent, query, { models}, info) => models.type.getDamageRelations(parent, query, { models}, info, 'double_damage_from'),
  //   no_damage_to:(parent, query, { models}, info) => models.type.getDamageRelations(parent, query, { models}, info, 'no_damage_to'),
  //   double_damage_to:(parent, query, { models}, info) => models.type.getDamageRelations(parent, query, { models}, info, 'double_damage_to'),
  // },
};
