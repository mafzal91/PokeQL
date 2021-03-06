var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var PokemonColorSchema = require('./pokemonSchemas').PokemonColor;

class PokemonColor {
  static getPokemonColors (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
		return Models.pokemonColor.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .then(data => data)
        .catch(error => error)
  }

  static getPokemonColor (parent, {id}, Models, info) {
    const projection = getProjection(info);


      if (parent) {
        if (parent._id) {id = parent._id }
        if (parent.color) {id = parent.color }
      }

		return Models.pokemonColor.findById(id)
        .select(projection)
        .then(data => data)
        .catch(error => error)
  }
}

PokemonColorSchema.loadClass(PokemonColor)

module.exports = mongo.model('PokemonColor', PokemonColorSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
