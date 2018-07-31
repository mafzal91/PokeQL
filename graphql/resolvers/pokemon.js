const models = require('../../models')

module.exports = {
  LocationAreaEncounter: {
    location_area: models.locationArea.getLocationArea,
  },

  PokemonStat: {
    stat: models.stat.getStat,
  },

  PokemonMoveVersion: {
    move_learn_method: models.moveLearnMethod.getMoveLearnMethod,
    version_group: models.versionGroup.getVersionGroup,
  },

  PokemonMove: {
    move: models.move.getMove,
  },

  PokemonHeldItemVersion: {
    version: models.version.getVersion,
  },

  PokemonHeldItem: {
    item: models.item.getItem,
  },

  PokemonType: {
    type: models.type.getType,
  },

  PokemonAbility: {
    ability: models.ability.getAbility,
  },

  Pokemon: {
    forms: models.pokemonForm.getPokemonForms,
    species: models.pokemonSpecies.getPokemonSpecies,
  },

  AbilityEffectChange: {
    version_group: models.versionGroup.getVersionGroup,
  },

  AbilityPokemon: {
    pokemon: models.pokemon.getPokemon,
  },

  Ability: {
    generation: models.generation.getGeneration,
  },

  EggGroup: {
    pokemon_species: models.pokemonSpecies.getPokemonSpeciess,
  },
  PokemonSpeciesGender: {
    pokemon_species: models.pokemonSpecies.getPokemonSpecies,
  },

  Gender: {
    required_for_evolution: models.pokemonSpecies.getPokemonSpeciess,
  },

  GrowthRate: {
    pokemon_species: models.pokemonSpecies.getPokemonSpeciess,
  },

  NatureStatChange: {
    pokeathlon_stat: models.pokeathlonStat.getPokeathlonStat,
  },

  MoveBattleStylePreference: {
    move_battle_style: models.moveBattleStyle.getMoveBattleStyle,
  },

  Nature: {
    decreased_stat: models.stat.getStat,
    increased_stat: models.stat.getStat,
    hates_flavor: models.berryFlavor.getBerryFlavor,
    likes_flavor: models.berryFlavor.getBerryFlavor,
  },

  NaturePokeathlonStatAffect: {
    nature: models.nature.getNature,
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
  AwesomeName: {
    language: models.language.getLanguage,
  },

  PokemonShape: {
    pokemon_species: models.pokemonSpecies.getPokemonSpeciess,
  },
  Genus: {
    language: models.language.getLanguage,
  },

  PokemonSpeciesDexEntry: {
    pokedex: models.pokedex.getPokedex,
  },

  PalParkEncounterArea: {
    area: models.palParkArea.getPalParkArea,
  },

  PokemonSpeciesVariety: {
    pokemon: models.pokemon.getPokemon,
  },

  PokemonSpecies: {
    growth_rate: models.growthRate.getGrowthRate,
    egg_groups: models.eggGroup.getEggGroups,
    color: models.pokemonColor.getPokemonColor,
    shape: models.pokemonShape.getPokemonShape,
    evolves_from_species: models.pokemonSpecies.getPokemonSpecies,
    evolution_chain: models.evolutionChain.getEvolutionChain,
    habitat: models.pokemonHabitat.getPokemonHabitat,
    generation: models.generation.getGeneration,
  },

  MoveStatAffect: {
    move: models.move.getMove,
  },


  Stat: {
    characteristics: models.characteristic.getCharacteristics,
    move_damage_class: models.moveDamageClass.getMoveDamageClass,
  },

  TypePokemon: {
    pokemon: models.pokemon.getPokemon,
  },

  DamageRelations: {
    half_damage_from: models.type.getType,
    no_damage_from: models.type.getType,
    half_damage_to: models.type.getType,
    double_damage_from: models.type.getType,
    no_damage_to: models.type.getType,
    double_damage_to: models.type.getType,
  },

  Type: {
    generation: models.generation.getGeneration,
    move_damage_class: models.moveDamageClass.getMoveDamageClass,
    moves: models.move.getMoves,
  },



}
