var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');

var EncounterConditionValueSchema = require('./encounterSchemas').EncounterConditionValue;

class EncounterConditionValue {
  static getEncounterConditionValues (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    console.log("COndition value", parent.condition_values)
    if(parent){
      if(parent.condition_values) query = { _id: { $in: parent.condition_values } }
    }
    if(query){
      return Models.encounterConditionValue.find(query)
          .select(projection)
          .skip(skip)
          .limit(limit).sort({pokeapi_id: 1})
          .then(data => data)
          .catch(error => error)
    } else {
      return null
    }
  }

  static getEncounterConditionValue (parent, {id}, Models, info) {
    const projection = getProjection(info);

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

    return Models.encounterConditionValue.findById(id)
        .select(projection)
        .then(data => data)
        .catch(error => error)
  }
}

EncounterConditionValueSchema.loadClass(EncounterConditionValue)

module.exports = mongo.model('EncounterConditionValue', EncounterConditionValueSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
