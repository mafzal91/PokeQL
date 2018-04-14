var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var MoveLearnMethodSchema = require('./MoveSchemas').MoveLearnMethod;

class MoveLearnMethod {
  static getMoveLearnMethods (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.moveLearnMethod.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getMoveLearnMethod (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.moveLearnMethod.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

MoveLearnMethodSchema.loadClass(MoveLearnMethod)

module.exports = mongo.model('MoveLearnMethod', MoveLearnMethodSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
