var {pokemon, type, ability, stat, generation, version, versionGroup, region, location, pokedex} = require('../models')

module.exports = {

  Query:{
    Pokemons: pokemon.getPokemons,
    Pokemon: pokemon.getPokemon,

    Abilities: ability.getAbilities,
    Ability: ability.getAbility,

    Stats: stat.getStats,
    Stat: stat.getStat,

    Types:type.getTypes,
    Type:type.getType,

    Generations: generation.getGenerations,
    Generation: generation.getGeneration,

    Versions: version.getVersions,
    Version: version.getVersion,

    VersionGroups: versionGroup.getVersionGroups,
    VersionGroup: versionGroup.getVersionGroup,

    Region: region.getRegion,
    Regions: region.getRegions,

    Location: location.getLocation,
    Locations: location.getLocations,

    Pokedex: pokedex.getPokedex,
    Pokedexes: pokedex.getPokedexes,
  },

  Type: {
    generation: generation.getGeneration
  },

  TypeDamageRelations:{
    half_damage_from: (parent, query, Models, info) => type.getDamageRelations(parent, query, Models, info, 'half_damage_from'),
    no_damage_from: (parent, query, Models, info) => type.getDamageRelations(parent, query, Models, info, 'no_damage_from'),
    half_damage_to: (parent, query, Models, info) => type.getDamageRelations(parent, query, Models, info, 'half_damage_to'),
    double_damage_from:(parent, query, Models, info) => type.getDamageRelations(parent, query, Models, info, 'double_damage_from'),
    no_damage_to:(parent, query, Models, info) => type.getDamageRelations(parent, query, Models, info, 'no_damage_to'),
    double_damage_to:(parent, query, Models, info) => type.getDamageRelations(parent, query, Models, info, 'double_damage_to'),
  },

  Pokemon: {

  },
  PokemonType: {
    type:type.getType,
  },
  PokemonAbility: {
    ability: ability.getAbility
  },
  PokemonStat: {
    stat: stat.getStat,
  },


  Ability: {
    generation: generation.getGeneration,
    // AbilityFlavorText: (parent, id, s,sd) => console.log(parent)
  },
  AbilityEffectEntry: {

  },
  AbilityEffectChange: {

  },
  AbilityEffectChangeEffectEntry:{

  },

  Version: {
    version_groups: versionGroup.getVersionGroup
  },
  VersionGroup: {
    generation: generation.getGeneration,
    regions: region.getRegion
    // pokedexes:
  },

  Region: {
    locations: location.getLocations,
    main_generation: generation.getGeneration,
    version_groups: versionGroup.getVersionGroup,
    pokedexes: pokedex.getPokedexes
  },

  Location: {
    region: region.getRegion,
  },
  LocationGameIndex: {
    generation: generation.getGeneration
  }
}
