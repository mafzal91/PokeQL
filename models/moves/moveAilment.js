var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var MoveAilmentSchema = require('./MoveSchemas').MoveAilment;

class MoveAilment {
  static getMoveAilments (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);


    return Models.moveAilment.find(query)
      .select(projection)
      .skip(skip)
      .limit(limit).sort({pokeapi_id: 1})
      .exec()
      .then(data => data)
      .catch(error => error)
  }

  static getMoveAilment (parent, {id}, Models, info) {
    const projection = getProjection(info);
      if (parent) {
        console.log("MOVE AILMENT",parent)
        if (parent._id) {
          id = parent._id
        }
        if (parent.ailment) {
          id = parent.ailment
        }
      }

    return Models.moveAilment.findById({_id: id})
      .select(projection)
      .exec()
      .then(data => data)
      .catch(error => error)
  }
}

MoveAilmentSchema.loadClass(MoveAilment)

module.exports = mongo.model('MoveAilment', MoveAilmentSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
