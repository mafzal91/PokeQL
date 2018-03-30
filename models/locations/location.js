var mongo = require('../../services/mongodb');
var LocationSchema = require('./locationSchemas').Location;
var { getProjection } = require('../../utils');

class Location {
  static getLocations (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.location.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getLocation (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.location.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

LocationSchema.loadClass(Location)

module.exports = mongo.model('Location', LocationSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
