var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var PokemonShapeSchema = require('./pokemonSchemas').PokemonShape;

class PokemonShape {
  static getPokemonShapes (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
    
		return Models.pokemonShape.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .then(data => data)
        .catch(error => error)
  }

  static getPokemonShape (parent, {id}, Models, info) {
    const projection = getProjection(info);


    if (parent) {
      if (parent._id) { id = parent._id }
      if (parent.shape) { id = parent.shape }
    }

		return Models.pokemonShape.findById(id)
        .select(projection)
        .then(data => data)
        .catch(error => error)
  }
}

PokemonShapeSchema.loadClass(PokemonShape)

module.exports = mongo.model('PokemonShape', PokemonShapeSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
