var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var ItemPocketSchema = require('./itemSchemas').ItemPocket;

class ItemPocket {
  static getItemPockets (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return Models.itemPocket.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .then(data => data)
        .catch(error => error)
  }

  static getItemPocket (parent, {id}, Models, info) {
    const projection = getProjection(info);
    console.log(parent)
      if (parent) {
        if (parent._id) { id = parent._id }
        if (parent.pocket) { id = parent.pocket }
      }

    return Models.itemPocket.findById(id)
        .select(projection)
        .then(data => data)
        .catch(error => error)
  }
}

ItemPocketSchema.loadClass(ItemPocket)

module.exports = mongo.model('ItemPocket', ItemPocketSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
