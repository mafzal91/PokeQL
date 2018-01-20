var {pokemon, generation} = require('../models')

module.exports = {
    Generations: generation.getGenerations,
    Generation: generation.getGeneration
  }
