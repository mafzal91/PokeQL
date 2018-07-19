var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');

var GenderSchema = require('./pokemonSchemas').Gender;

class Gender {
  static getGenders (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
		return Models.gender.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getGender (parent, {id}, Models, info) {
    const projection = getProjection(info);


      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

		return Models.gender.findById(id)
        .select(projection)
        .exec()
        .then(data => data)
        .catch(error => error)
  }
}

GenderSchema.loadClass(Gender)

module.exports = mongo.model('Gender', GenderSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
