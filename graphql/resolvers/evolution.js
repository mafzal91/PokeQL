const models = require('../../models')

module.exports = {
  EvolutionChain: {
    baby_trigger_item: models.item.getItem
  },

  EvolutionDetail: {
    item: models.item.getItem,
    trigger: models.evolutionTrigger.getEvolutionTrigger,
    held_item: models.item.getItem,
    known_move: models.move.getMove,
    // known_move_type: () => console.log(arguments[1].id),
    known_move_type: models.type.getType,
    location: models.location.getLocation,
    party_species: models.pokemonSpecies.getPokemonSpecies,
    party_type: models.type.getType,
    trade_species: models.pokemonSpecies.getPokemonSpecies,
  },

  ChainLink: {
    species: models.pokemonSpecies.getPokemonSpecies,
  },


  EvolutionTrigger: {
    pokemon_species: models.pokemonSpecies.getPokemonSpeciess,
  },
}
