var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var EncounterConditionSchema = require('./encounterSchemas').EncounterCondition;

class EncounterCondition {
  static getEncounterConditions (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return Models.encounterCondition.find(query)
      .select(projection)
      .skip(skip)
      .limit(limit).sort({pokeapi_id: 1})
      .then(data => data)
      .catch(error => error)
  }

  static getEncounterCondition (parent, {id}, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) { id = parent._id }
      if (parent.condition) { id = parent.condition }
    }

    return Models.encounterCondition.findById(id)
      .select(projection)
      .then(data => data)
      .catch(error => error)
  }
}

EncounterConditionSchema.loadClass(EncounterCondition)

module.exports = mongo.model('EncounterCondition', EncounterConditionSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
