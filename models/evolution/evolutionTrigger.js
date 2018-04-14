var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var EvolutionTriggerSchema = require('./evolutionSchemas').EvolutionTrigger;

class EvolutionTrigger {
  static getEvolutionTriggers (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.evolutionTrigger.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getEvolutionTrigger (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.evolutionTrigger.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

EvolutionTriggerSchema.loadClass(EvolutionTrigger)

module.exports = mongo.model('EvolutionTrigger', EvolutionTriggerSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
