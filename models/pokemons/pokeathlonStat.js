var mongo = require('../../services/mongodb');
var PokeathlonStatSchema = require('./pokemonSchemas').PokeathlonStat;

class PokeathlonStat {
  static getPokeathlonStats (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.pokeathlonStat.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getPokeathlonStat (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.pokeathlonStat.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

PokeathlonStatSchema.loadClass(PokeathlonStat)

module.exports = mongo.model('PokeathlonStat', PokeathlonStatSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
