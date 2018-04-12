var mongo = require('../../services/mongodb');
var ItemCategorySchema = require('./itemSchemas').ItemCategory;

class ItemCategory {
  static getItemCategories (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.itemCategory.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getItemCategory (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.itemCategory.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

ItemCategorySchema.loadClass(ItemCategory)

module.exports = mongo.model('ItemCategory', ItemCategorySchema);

module.exports.ObjectId = mongo.Types.ObjectId;
