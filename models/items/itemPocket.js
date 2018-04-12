var mongo = require('../../services/mongodb');
var ItemPocketSchema = require('./itemSchemas').ItemPocket;

class ItemPocket {
  static getItemPockets (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.itemPocket.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getItemPocket (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.itemPocket.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

ItemPocketSchema.loadClass(ItemPocket)

module.exports = mongo.model('ItemPocket', ItemPocketSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
