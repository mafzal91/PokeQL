import * as models from "../../models";

export default {
  Location: {
    region: models.region.getRegion,
    areas: models.locationArea.getLocationAreas,
  },

  EncounterVersionDetails: {
    version: models.version.getVersion,
  },
  EncounterMethodRate: {
    encounter_method: models.encounterMethod.getEncounterMethod,
  },
  PokemonEncounter: {
    pokemon: models.pokemon.getPokemon,
  },
  LocationArea: {
    location: models.location.getLocation,
  },

  PalParkEncounterSpecies: {
    pokemon_species: models.pokemonSpecies.getPokemonSpecies,
  },
  PalParkArea: {},

  Region: {
    locations: models.location.getLocations,
    main_generation: models.generation.getGeneration,
    pokedexes: models.pokedex.getPokedexes,
    version_groups: models.versionGroup.getVersionGroups,
  },
};
