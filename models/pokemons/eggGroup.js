var mongo = require('../../services/mongodb');
var EggGroupSchema = require('./pokemonSchemas').EggGroup;

class EggGroup {
  static getEggGroups (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.eggGroup.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getEggGroup (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.eggGroup.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

EggGroupSchema.loadClass(EggGroup)

module.exports = mongo.model('EggGroup', EggGroupSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
