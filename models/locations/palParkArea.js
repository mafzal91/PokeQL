var mongo = require('../../services/mongodb');
var PalParkAreaSchema = require('./locationSchemas').PalParkArea;
var { getProjection } = require('../../utils');

class PalParkArea {
  static getPalParkAreas (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.palParkArea.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getPalParkArea (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.palParkArea.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

PalParkAreaSchema.loadClass(PalParkArea)

module.exports = mongo.model('PalParkArea', PalParkAreaSchema);

module.exports.ObjectId = mongo.Types.ObjectId;