var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var MoveCategorySchema = require('./MoveSchemas').MoveCategory;

class MoveCategory {
  static getMoveCategories (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);


    return Models.moveCategory.find(query)
      .select(projection)
      .skip(skip)
      .limit(limit).sort({pokeapi_id: 1})
      .exec()
      .then(data => data)
      .catch(error => error)
  }

  static getMoveCategory (parent, {id}, Models, info) {
    const projection = getProjection(info);
    console.log(parent)
      if (parent) {
        if (parent._id) { id = parent._id }
        if (parent.category) { id = parent.category }
      }

    return Models.moveCategory.findById({_id: id})
      .select(projection)
      .exec()
      .then(data => data)
      .catch(error => error)
  }
}

MoveCategorySchema.loadClass(MoveCategory)

module.exports = mongo.model('MoveCategory', MoveCategorySchema);

module.exports.ObjectId = mongo.Types.ObjectId;
