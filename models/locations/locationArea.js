var mongo = require('../../services/mongodb');
var LocationAreaSchema = require('./locationSchemas').LocationArea;
var { getProjection } = require('../../utils');

class LocationArea {
  static getLocationAreas (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.locationArea.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getLocationArea (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.locationArea.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

LocationAreaSchema.loadClass(LocationArea)

module.exports = mongo.model('LocationArea', LocationAreaSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
