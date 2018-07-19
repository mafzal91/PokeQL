var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var EvolutionTriggerSchema = require('./evolutionSchemas').EvolutionTrigger;

class EvolutionTrigger {
  static getEvolutionTriggers (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return Models.evolutionTrigger.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getEvolutionTrigger (parent, {id}, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) { id = parent._id }
      if (parent.trigger) { id = parent.trigger }
    }

    return Models.evolutionTrigger.findById(id)
        .select(projection)
        .exec()
        .then(data => data)
        .catch(error => error)
  }
}

EvolutionTriggerSchema.loadClass(EvolutionTrigger)

module.exports = mongo.model('EvolutionTrigger', EvolutionTriggerSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
