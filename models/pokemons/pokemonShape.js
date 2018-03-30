var mongo = require('../../services/mongodb');
var PokemonShapeSchema = require('./pokemonSchemas').PokemonShape;

class PokemonShape {
  static getPokemonShapes (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.pokemonShape.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getPokemonShape (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.pokemonShape.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

PokemonShapeSchema.loadClass(PokemonShape)

module.exports = mongo.model('PokemonShape', PokemonShapeSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
