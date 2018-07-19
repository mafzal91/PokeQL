var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var PokemonFormSchema = require('./pokemonSchemas').PokemonForm;

class PokemonForm {
  static getPokemonForms (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
		return Models.pokemonForm.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getPokemonForm (parent, {id}, Models, info) {
    const projection = getProjection(info);


      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

		return Models.pokemonForm.findById(id)
        .select(projection)
        .exec()
        .then(data => data)
        .catch(error => error)
  }
}

PokemonFormSchema.loadClass(PokemonForm)

module.exports = mongo.model('PokemonForm', PokemonFormSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
