var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var MoveDamageClassSchema = require('./MoveSchemas').MoveDamageClass;

class MoveDamageClass {
  static getMoveDamageClasses (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);


    return Models.moveDamageClass.find(query)
      .select(projection)
      .skip(skip)
      .limit(limit).sort({pokeapi_id: 1})
      .exec()
      .then(data => data)
      .catch(error => error)
  }

  static getMoveDamageClass (parent, {id}, Models, info) {
    const projection = getProjection(info);

      if (parent) {
        if (parent._id) { id = parent._id }
        if(parent.damage_class) { id = parent.damage_class }
      }

    return Models.moveDamageClass.findById({_id: id})
      .select(projection)
      .exec()
      .then(data => data)
      .catch(error => error)
  }
}

MoveDamageClassSchema.loadClass(MoveDamageClass)

module.exports = mongo.model('MoveDamageClass', MoveDamageClassSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
