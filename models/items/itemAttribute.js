var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var ItemAttributeSchema = require('./itemSchemas').ItemAttribute;

class ItemAttribute {
  static getItemAttributes (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.itemAttribute.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
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

      Models.itemAttribute.findById(id)
        .select(projection)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

ItemAttributeSchema.loadClass(ItemAttribute)

module.exports = mongo.model('ItemAttribute', ItemAttributeSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
