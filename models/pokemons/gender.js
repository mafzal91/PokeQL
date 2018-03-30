var mongo = require('../../services/mongodb');
var GenderSchema = require('./pokemonSchemas').Gender;

class Gender {
  static getGenders (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.gender.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getGender (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.gender.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

GenderSchema.loadClass(Gender)

module.exports = mongo.model('Gender', GenderSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
