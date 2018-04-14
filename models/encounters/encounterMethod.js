var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var EncounterMethodSchema = require('./encounterSchemas').EncounterMethod;

class EncounterMethod {
  static getEncounterMethods (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.encounterMethod.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getEncounterMethod (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.encounterMethod.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

EncounterMethodSchema.loadClass(EncounterMethod)

module.exports = mongo.model('EncounterMethod', EncounterMethodSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
