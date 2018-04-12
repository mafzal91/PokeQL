var models = require('../models')

module.exports = {

  Query:{
    Berry: models.berry.getBerry,
    Berries: models.berry.getBerries,

    BerryFirmness: models.berryFirmness.getBerryFirmness,
    BerryFirmnesses: models.berryFirmness.getBerryFirmnesses,

    BerryFlavor: models.berryFlavor.getBerryFlavor,
    BerryFlavors: models.berryFlavor.getBerryFlavors,

    ContestType: models.contestType.getContestType,
    ContestTypes: models.contestType.getContestTypes,

    ContestEffect: models.contestEffect.getContestEffect,
    ContestEffects: models.contestEffect.getContestEffects,

    SuperContestEffect: models.superContestEffect.getSuperContestEffect,
    SuperContestEffects: models.superContestEffect.getSuperContestEffects,

    EncounterMethod: models.encounterMethod.getEncounterMethod,
    EncounterMethods: models.encounterMethod.getEncounterMethods,

    EncounterCondition: models.encounterCondition.getEncounterCondition,
    EncounterConditions: models.encounterCondition.getEncounterConditions,

    EncounterConditionValue: models.encounterConditionValue.getEncounterConditionValue,
    EncounterConditionValues: models.encounterConditionValue.getEncounterConditionValues,

    EvolutionChain: models.evolutionChain.getEvolutionChain,
    EvolutionChains: models.evolutionChain.getEvolutionChains,

    EvolutionTrigger: models.evolutionTrigger.getEvolutionTrigger,
    EvolutionTriggers: models.evolutionTrigger.getEvolutionTriggers,

    Generation: models.generation.getGeneration,
    Generations: models.generation.getGenerations,

    Pokedex: models.pokedex.getPokedex,
    Pokedexes: models.pokedex.getPokedexes,

    Version: models.version.getVersion,
    Versions: models.version.getVersions,

    VersionGroup: models.versionGroup.getVersionGroup,
    VersionGroups: models.versionGroup.getVersionGroups,

    Item: models.item.getItem,
    Items: models.item.getItems,

    ItemAttribute: models.itemAttribute.getItemAttribute,
    ItemAttributes: models.itemAttribute.getItemAttributes,

    ItemCategory: models.itemCategory.getItemCategory,
    ItemCategories: models.itemCategory.getItemCategories,

    ItemFlingEffect: models.itemFlingEffect.getItemFlingEffect,
    ItemFlingEffects: models.itemFlingEffect.getItemFlingEffects,

    ItemPocket: models.itemPocket.getItemPocket,
    ItemPockets: models.itemPocket.getItemPockets,

    Location: models.location.getLocation,
    Locations: models.location.getLocations,

    LocationArea: models.locationArea.getLocationArea,
    LocationAreas: models.locationArea.getLocationAreas,

    PalParkArea: models.palParkArea.getPalParkArea,
    PalParkAreas: models.palParkArea.getPalParkAreas,

    Region: models.region.getRegion,
    Regions: models.region.getRegions,

    Machine: models.machine.getMachine,
    Machines: models.machine.getMachines,

    Move: models.move.getMove,
    Moves: models.move.getMoves,

    MoveAilment: models.moveAilment.getMoveAilment,
    MoveAilments: models.moveAilment.getMoveAilments,

    MoveBattleStyle: models.moveBattleStyle.getMoveBattleStyle,
    MoveBattleStyles: models.moveBattleStyle.getMoveBattleStyles,

    MoveCategory: models.moveCategory.getMoveCategory,
    MoveCategories: models.moveCategory.getMoveCategories,

    MoveDamageClass: models.moveDamageClass.getMoveDamageClass,
    MoveDamageClasses: models.moveDamageClass.getMoveDamageClasses,

    MoveLearnMethod: models.moveLearnMethod.getMoveLearnMethod,
    MoveLearnMethods: models.moveLearnMethod.getMoveLearnMethods,

    MoveTarget: models.moveTarget.getMoveTarget,
    MoveTargets: models.moveTarget.getMoveTargets,

    Ability: models.ability.getAbility,
    Abilities: models.ability.getAbilities,

    Characteristic: models.characteristic.getCharacteristic,
    Characteristics: models.characteristic.getCharacteristics,

    EggGroup: models.eggGroup.getEggGroup,
    EggGroups: models.eggGroup.getEggGroups,

    Gender: models.gender.getGender,
    Genders: models.gender.getGenders,

    GrowthRate: models.growthRate.getGrowthRate,
    GrowthRates: models.growthRate.getGrowthRates,

    Nature: models.nature.getNature,
    Natures: models.nature.getNatures,

    PokeathlonStat: models.pokeathlonStat.getPokeathlonStat,
    PokeathlonStats: models.pokeathlonStat.getPokeathlonStats,

    Pokemon: models.pokemon.getPokemon,
    Pokemons: models.pokemon.getPokemons,

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

    Stat: models.stat.getStat,
    Stats: models.stat.getStats,

    Type: models.type.getType,
    Types: models.type.getTypes,

    Language: models.language.getLanguage,
    Languages: models.language.getLanguages,
  },

  Type: {
    generation: models.generation.getGeneration
  },

  DamageRelations:{
    half_damage_from: (parent, query, Models, info) => models.type.getDamageRelations(parent, query, Models, info, 'half_damage_from'),
    no_damage_from: (parent, query, Models, info) => models.type.getDamageRelations(parent, query, Models, info, 'no_damage_from'),
    half_damage_to: (parent, query, Models, info) => models.type.getDamageRelations(parent, query, Models, info, 'half_damage_to'),
    double_damage_from:(parent, query, Models, info) => models.type.getDamageRelations(parent, query, Models, info, 'double_damage_from'),
    no_damage_to:(parent, query, Models, info) => models.type.getDamageRelations(parent, query, Models, info, 'no_damage_to'),
    double_damage_to:(parent, query, Models, info) => models.type.getDamageRelations(parent, query, Models, info, 'double_damage_to'),
  },

}
