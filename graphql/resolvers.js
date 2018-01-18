var {pokemon, generation} = require('../models')
console.log(generation.getGenerations);
module.exports = {

  Query: {
    Generations: () => {
      console.log("1");
    return 'Hello world!';
  },
    Generation: generation.getGeneration
  }
}
