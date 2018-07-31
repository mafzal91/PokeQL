var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var MoveBattleStyleSchema = require('./MoveSchemas').MoveBattleStyle;

class MoveBattleStyle {
  static getMoveBattleStyles (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);


    return Models.moveBattleStyle.find(query)
      .select(projection)
      .skip(skip)
      .limit(limit).sort({pokeapi_id: 1})
      .exec()
      .then(data => data)
      .catch(error => error)
  }

  static getMoveBattleStyle (parent, {id}, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) { id = parent._id }
      if (parent.move_battle_style) { id = parent.move_battle_style }
    }

    return Models.moveBattleStyle.findById({_id: id})
      .select(projection)
      .exec()
      .then(data => data)
      .catch(error => error)
  }
}

MoveBattleStyleSchema.loadClass(MoveBattleStyle)

module.exports = mongo.model('MoveBattleStyle', MoveBattleStyleSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
