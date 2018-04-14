var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var MoveBattleStyleSchema = require('./MoveSchemas').MoveBattleStyle;

class MoveBattleStyle {
  static getMoveBattleStyles (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.moveAliment.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getMoveBattleStyle (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.moveAliment.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

MoveBattleStyleSchema.loadClass(MoveBattleStyle)

module.exports = mongo.model('MoveBattleStyle', MoveBattleStyleSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
