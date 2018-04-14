var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');

var ItemSchema = require('./itemSchemas').Item;

class Item {
  static getItems (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.item.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getItem (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.item.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

ItemSchema.loadClass(Item)

module.exports = mongo.model('Item', ItemSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
