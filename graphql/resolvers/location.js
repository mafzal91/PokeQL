import * as models from "../../models/index.js";

export default {
  EncounterMethodRate: {
    encounter_method: models.encounterMethod.getEncounterMethod,
  },
  EncounterVersionDetails: {
    version: models.version.getVersion,
  },
  Location: {
    areas: models.locationArea.getLocationAreas,
    region: models.region.getRegion,
  },
  LocationArea: {
    location: models.location.getLocation,
  },
  PalParkArea: {},
  PalParkEncounterSpecies: {
    pokemon_species: models.pokemonSpecies.getPokemonSpecies,
  },
  PokemonEncounter: {
    pokemon: models.pokemon.getPokemon,
  },
  Region: {
    locations: models.location.getLocations,
    main_generation: models.generation.getGeneration,
    pokedexes: models.pokedex.getPokedexes,
    version_groups: models.versionGroup.getVersionGroups,
  },
};
