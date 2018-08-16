var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var MoveLearnMethodSchema = require('./MoveSchemas').MoveLearnMethod;

class MoveLearnMethod {
  static getMoveLearnMethods (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);


    return Models.moveLearnMethod.find(query)
      .select(projection)
      .skip(skip)
      .limit(limit).sort({pokeapi_id: 1})
      .then(data => data)
      .catch(error => error)
  }

  static getMoveLearnMethod (parent, {id}, Models, info) {
    const projection = getProjection(info);

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
        if (parent.move_learn_method) {
          id = parent.move_learn_method
        }
      }

    return Models.moveLearnMethod.findById({_id: id})
      .select(projection)
      .then(data => data)
      .catch(error => error)
  }
}

MoveLearnMethodSchema.loadClass(MoveLearnMethod)

module.exports = mongo.model('MoveLearnMethod', MoveLearnMethodSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
