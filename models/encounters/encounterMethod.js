var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var EncounterMethodSchema = require('./encounterSchemas').EncounterMethod;

class EncounterMethod {
  static getEncounterMethods (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    if(parent){}

    return Models.encounterMethod.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .then(data => data)
        .catch(error => error)
  }

  static getEncounterMethod (parent, {id}, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) { id = parent._id }
      if (parent.encounter_method) { id = parent.encounter_method }
      if (parent.method) { id = parent.method }
    }

    return Models.encounterMethod.findById(id)
        .select(projection)
        .then(data => data)
        .catch(error => error)
  }
}

EncounterMethodSchema.loadClass(EncounterMethod)

module.exports = mongo.model('EncounterMethod', EncounterMethodSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
