var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');

var PokeathlonStatSchema = require('./pokemonSchemas').PokeathlonStat;

class PokeathlonStat {
  static getPokeathlonStats (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
		return Models.pokeathlonStat.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getPokeathlonStat (parent, {id}, Models, info) {
    const projection = getProjection(info);


      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }
		return Models.pokeathlonStat.findById(id)
        .select(projection)
        .exec()
        .then(data => data)
        .catch(error => error)
  }
}

PokeathlonStatSchema.loadClass(PokeathlonStat)

module.exports = mongo.model('PokeathlonStat', PokeathlonStatSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
