var mongo = require('../../services/mongodb');
var MoveAilmentSchema = require('./MoveSchemas').MoveAilment;

class MoveAilment {
  static getMoveAilments (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.moveAilment.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getMoveAilment (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.moveAilment.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

MoveAilmentSchema.loadClass(MoveAilment)

module.exports = mongo.model('MoveAilment', MoveAilmentSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
