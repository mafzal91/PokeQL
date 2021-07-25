import * as models from "../../models/index.js";

export default {
  ChainLink: {
    species: models.pokemonSpecies.getPokemonSpecies,
  },
  EvolutionChain: {
    baby_trigger_item: models.item.getItem,
  },
  EvolutionDetail: {
    held_item: models.item.getItem,
    item: models.item.getItem,
    known_move: models.move.getMove,
    // known_move_type: () => console.log(arguments[1].id),
    known_move_type: models.type.getType,
    location: models.location.getLocation,
    party_species: models.pokemonSpecies.getPokemonSpecies,
    party_type: models.type.getType,
    trade_species: models.pokemonSpecies.getPokemonSpecies,
    trigger: models.evolutionTrigger.getEvolutionTrigger,
  },
  EvolutionTrigger: {
    pokemon_species: models.pokemonSpecies.getPokemonSpeciess,
  },
};
