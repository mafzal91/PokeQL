var mongo = require('../../services/mongodb');
var PokemonFormSchema = require('./pokemonSchemas').PokemonForm;

class PokemonForm {
  static getPokemonForms (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.pokemonForm.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getPokemonForm (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.pokemonForm.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

PokemonFormSchema.loadClass(PokemonForm)

module.exports = mongo.model('PokemonForm', PokemonFormSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
