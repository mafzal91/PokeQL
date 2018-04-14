var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var PokemonColorSchema = require('./pokemonSchemas').PokemonColor;

class PokemonColor {
  static getPokemonColors (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.pokemonColor.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getPokemonColor (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.pokemonColor.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

PokemonColorSchema.loadClass(PokemonColor)

module.exports = mongo.model('PokemonColor', PokemonColorSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
