var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');

var NatureSchema = require('./pokemonSchemas').Nature;

class Nature {
  static getNatures (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
		return Models.nature.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getNature (parent, {id}, Models, info) {
    const projection = getProjection(info);


      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

		return Models.nature.findById(id)
        .select(projection)
        .exec()
        .then(data => data)
        .catch(error => error)
  }
}

NatureSchema.loadClass(Nature)

module.exports = mongo.model('Nature', NatureSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
