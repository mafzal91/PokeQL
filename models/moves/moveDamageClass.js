var mongo = require('../../services/mongodb');
var MoveDamageClassSchema = require('./MoveSchemas').MoveDamageClass;

class MoveDamageClass {
  static getMoveDamageClasses (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.moveDamageClass.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getMoveDamageClass (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.moveDamageClass.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

MoveDamageClassSchema.loadClass(MoveDamageClass)

module.exports = mongo.model('MoveDamageClass', MoveDamageClassSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
