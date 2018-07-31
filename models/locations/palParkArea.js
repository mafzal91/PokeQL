var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var PalParkAreaSchema = require('./locationSchemas').PalParkArea;

class PalParkArea {
  static getPalParkAreas (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);



    return Models.palParkArea.find(query)
      .select(projection)
      .skip(skip)
      .limit(limit).sort({pokeapi_id: 1})
      .then(data => data)
      .catch(error => error)
  }

  static getPalParkArea (parent, {id}, Models, info) {
    const projection = getProjection(info);
console.log(parent)

    if (parent) {
      if (parent._id) { id = parent._id }
      if (parent.area) { id = parent.area }
    }

    return Models.palParkArea.findById({_id: id})
      .select(projection)
      .then(data => data)
      .catch(error => error)
  }
}

PalParkAreaSchema.loadClass(PalParkArea)

module.exports = mongo.model('PalParkArea', PalParkAreaSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
