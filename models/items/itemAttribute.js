var mongo = require('../../services/mongodb');
var ItemAttributeSchema = require('./itemSchemas').ItemAttribute;

class ItemAttribute {
  static getItemAttributes (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.itemAttribute.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getItemAttribute (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.itemAttribute.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

ItemAttributeSchema.loadClass(ItemAttribute)

module.exports = mongo.model('ItemAttribute', ItemAttributeSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
