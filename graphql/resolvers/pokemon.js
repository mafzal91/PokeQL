import * as models from "../../models/index.js";

export default {
  Ability: {
    generation: models.generation.getGeneration,
  },
  AbilityEffectChange: {
    version_group: models.versionGroup.getVersionGroup,
  },
  AbilityPokemon: {
    pokemon: models.pokemon.getPokemon,
  },
  AwesomeName: {
    language: models.language.getLanguage,
  },
  // DamageRelations: {
  //   double_damage_from: models.type.getTypes,
  //   double_damage_to: models.type.getTypes,
  //   half_damage_from: models.type.getTypes,
  //   half_damage_to: models.type.getTypes,
  //   no_damage_from: models.type.getTypes,
  //   no_damage_to: models.type.getTypes,
  // },
  DamageRelations: () => {
    console.log("WIP");
  },
  EggGroup: {
    pokemon_species: models.pokemonSpecies.getPokemonSpeciess,
  },
  Gender: {
    required_for_evolution: models.pokemonSpecies.getPokemonSpeciess,
  },
  Genus: {
    language: models.language.getLanguage,
  },
  GrowthRate: {
    pokemon_species: models.pokemonSpecies.getPokemonSpeciess,
  },
  LocationAreaEncounter: {
    location_area: models.locationArea.getLocationArea,
  },
  MoveBattleStylePreference: {
    move_battle_style: models.moveBattleStyle.getMoveBattleStyle,
  },
  MoveStatAffect: {
    move: models.move.getMove,
  },
  Nature: {
    decreased_stat: models.stat.getStat,
    hates_flavor: models.berryFlavor.getBerryFlavor,
    increased_stat: models.stat.getStat,
    likes_flavor: models.berryFlavor.getBerryFlavor,
  },
  NaturePokeathlonStatAffect: {
    nature: models.nature.getNature,
  },
  NatureStatAffectSets: {
    decrease: models.nature.getNatures,
    increase: models.nature.getNatures,
  },
  NatureStatChange: {
    pokeathlon_stat: models.pokeathlonStat.getPokeathlonStat,
  },
  PalParkEncounterArea: {
    area: models.palParkArea.getPalParkArea,
  },
  Pokemon: {
    forms: models.pokemonForm.getPokemonForms,
    species: models.pokemonSpecies.getPokemonSpecies,
  },
  PokemonAbility: {
    ability: models.ability.getAbility,
  },
  PokemonColor: {
    pokemon_species: models.pokemonSpecies.getPokemonSpeciess,
  },
  PokemonForm: {
    pokemon: models.pokemon.getPokemon,
    version_group: models.versionGroup.getVersionGroup,
  },
  PokemonHabitat: {
    pokemon_species: models.pokemonSpecies.getPokemonSpeciess,
  },
  PokemonHeldItem: {
    item: models.item.getItem,
  },
  PokemonHeldItemVersion: {
    version: models.version.getVersion,
  },
  PokemonMove: {
    move: models.move.getMove,
  },
  PokemonMoveVersion: {
    move_learn_method: models.moveLearnMethod.getMoveLearnMethod,
    version_group: models.versionGroup.getVersionGroup,
  },
  PokemonShape: {
    pokemon_species: models.pokemonSpecies.getPokemonSpeciess,
  },
  PokemonSpecies: {
    color: models.pokemonColor.getPokemonColor,
    egg_groups: models.eggGroup.getEggGroups,
    evolution_chain: models.evolutionChain.getEvolutionChain,
    evolves_from_species: models.pokemonSpecies.getPokemonSpecies,
    generation: models.generation.getGeneration,
    growth_rate: models.growthRate.getGrowthRate,
    habitat: models.pokemonHabitat.getPokemonHabitat,
    shape: models.pokemonShape.getPokemonShape,
  },
  PokemonSpeciesDexEntry: {
    pokedex: models.pokedex.getPokedex,
  },
  PokemonSpeciesGender: {
    pokemon_species: models.pokemonSpecies.getPokemonSpecies,
  },
  PokemonSpeciesVariety: {
    pokemon: models.pokemon.getPokemon,
  },
  PokemonStat: {
    stat: models.stat.getStat,
  },
  PokemonType: {
    type: models.type.getType,
  },
  Stat: {
    characteristics: models.characteristic.getCharacteristics,
    move_damage_class: models.moveDamageClass.getMoveDamageClass,
  },
  Type: {
    generation: models.generation.getGeneration,
    move_damage_class: models.moveDamageClass.getMoveDamageClass,
    moves: models.move.getMoves,
  },
  TypePokemon: {
    pokemon: models.pokemon.getPokemon,
  },
};
