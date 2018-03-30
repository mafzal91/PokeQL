var mongo = require('../../services/mongodb');
var NatureSchema = require('./pokemonSchemas').Nature;

class Nature {
  static getNatures (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.nature.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getNature (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.nature.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

NatureSchema.loadClass(Nature)

module.exports = mongo.model('Nature', NatureSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
