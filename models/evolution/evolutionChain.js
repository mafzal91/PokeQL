var mongo = require('../../services/mongodb');
var EvolutionChainSchema = require('./evolutionSchemas').EvolutionChain;

class EvolutionChain {
  static getEvolutionChains (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.evolutionChain.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getEvolutionChain (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.evolutionChain.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

EvolutionChainSchema.loadClass(EvolutionChain)

module.exports = mongo.model('EvolutionChain', EvolutionChainSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
