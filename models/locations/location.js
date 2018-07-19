var mongo = require('../../services/mongodb');
var LocationSchema = require('./locationSchemas').Location;
var { getProjection } = require('../../utils');

class Location {
  static getLocations (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    if(parent){
      if(parent.locations) { query = { _id: { $in: parent.locations } } }
    }

    return Models.location.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getLocation (parent, {id}, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) { id = parent._id }
      if (parent.location) { id = parent.location }
    }

    return Models.location.findById(id)
      .select(projection)
      .exec()
      .then(data => data)
      .catch(error => error)
  }
}

LocationSchema.loadClass(Location)

module.exports = mongo.model('Location', LocationSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
