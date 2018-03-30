var mongo = require('../../services/mongodb');
var MoveCategorySchema = require('./MoveSchemas').MoveCategory;

class MoveCategory {
  static getMoveCategories (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.moveBattleStyle.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getMoveCategory (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.moveBattleStyle.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

MoveCategorySchema.loadClass(MoveCategory)

module.exports = mongo.model('MoveCategory', MoveCategorySchema);

module.exports.ObjectId = mongo.Types.ObjectId;
