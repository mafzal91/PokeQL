var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var ItemCategorySchema = require('./itemSchemas').ItemCategory;

class ItemCategory {
  static getItemCategories (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);


    return Models.itemCategory.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getItemCategory (parent, {id}, Models, info) {
    const projection = getProjection(info);

      if (parent) {
        if (parent._id) { id = parent._id }
        if (parent.category) { id = parent.category }
      }

    return Models.itemCategory.findById(id)
        .select(projection)
        .exec()
        .then(data => data)
        .catch(error => error)
  }
}

ItemCategorySchema.loadClass(ItemCategory)

module.exports = mongo.model('ItemCategory', ItemCategorySchema);

module.exports.ObjectId = mongo.Types.ObjectId;
