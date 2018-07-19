const models = require('../../models')

module.exports = {
  Generation: {
    abilities: models.ability.getAbilities,
    main_region: models.region.getRegion,
    moves: models.move.getMoves,
    pokemon_species: models.pokemonSpecies.getPokemonSpeciess,
    types: models.type.getTypes,
    version_groups: models.versionGroup.getVersionGroups,
  },

  Pokedex: {
    region: models.region.getRegion,
    version_groups: models.versionGroup.getVersionGroups,
  },

  PokemonEntry: {
    pokemon_species: models.pokemonSpecies.getPokemonSpecies,
  },

  Version: {
    version_group: models.versionGroup.getVersionGroup,
  },

  VersionGroup: {
    generation: models.generation.getGeneration,
    move_learn_methods: models.moveLearnMethod.getMoveLearnMethods,
    pokedexes: models.pokedex.getPokedexes,
    regions: models.region.getRegions,
    versions: models.version.getVersions,
  },
}
