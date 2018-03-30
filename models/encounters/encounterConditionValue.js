var mongo = require('../../services/mongodb');
var EncounterConditionValueSchema = require('./encounterSchemas').EncounterConditionValue;

class EncounterConditionValue {
  static getEncounterConditionValues (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.encounterConditionValue.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getEncounterConditionValue (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.encounterConditionValue.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

EncounterConditionValueSchema.loadClass(EncounterConditionValue)

module.exports = mongo.model('EncounterConditionValue', EncounterConditionValueSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
