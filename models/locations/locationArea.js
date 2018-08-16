var mongo = require('../../services/mongodb');
var LocationAreaSchema = require('./locationSchemas').LocationArea;
var { getProjection } = require('../../utils');

class LocationArea {
  static getLocationAreas (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    if(parent){
      if(parent.areas) { query = { _id: { $in: parent.areas } } }
    }

    return Models.locationArea.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .then(data => (data))
        .catch(error => (error))
  }

  static getLocationArea (parent, {id}, Models, info) {
    const projection = getProjection(info);
console.log(parent)
    if (parent) {
      if (parent._id) { id = parent._id }
      if (parent.location_area) { id = parent.location_area }
    }

    return Models.locationArea.findById(id)
        .select(projection)
        .exec()
        .then(data => (data))
        .catch(error => (error))
  }
}

LocationAreaSchema.loadClass(LocationArea)

module.exports = mongo.model('LocationArea', LocationAreaSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
