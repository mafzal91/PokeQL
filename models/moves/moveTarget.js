var mongo = require('../../services/mongodb');
var MoveTargetSchema = require('./MoveSchemas').MoveTarget;

class MoveTarget {
  static getMoveTargets (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.moveTarget.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getMoveTarget (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.moveTarget.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

MoveTargetSchema.loadClass(MoveTarget)

module.exports = mongo.model('MoveTarget', MoveTargetSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
