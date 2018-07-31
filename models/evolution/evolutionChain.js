var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var EvolutionChainSchema = require('./evolutionSchemas').EvolutionChain;

class EvolutionChain {
  static getEvolutionChains (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return Models.evolutionChain.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getEvolutionChain (parent, {id}, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) { id = parent._id }
      if (parent.baby_trigger_for) { id = parent.baby_trigger_for }
      if (parent.evolution_chain) { id = parent.evolution_chain }
    }

    return Models.evolutionChain.findById(id)
        .select(projection)
        .exec()
        .then(data => data)
        .catch(error => error)
  }
}

EvolutionChainSchema.loadClass(EvolutionChain)

module.exports = mongo.model('EvolutionChain', EvolutionChainSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
