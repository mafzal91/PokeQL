var mongo = require('../../services/mongodb');
var EncounterConditionSchema = require('./encounterSchemas').EncounterCondition;

class EncounterCondition {
  static getEncounterConditions (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.encounterCondition.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getEncounterCondition (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.encounterCondition.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

EncounterConditionSchema.loadClass(EncounterCondition)

module.exports = mongo.model('EncounterCondition', EncounterConditionSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
