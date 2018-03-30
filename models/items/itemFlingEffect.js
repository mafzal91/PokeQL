var mongo = require('../../services/mongodb');
var ItemFlingEffectSchema = require('./ItemSchemas').ItemFlingEffect;

class ItemFlingEffect {
  static getItemFlingEffects (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.itemFlingEffect.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getItemFlingEffect (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.itemFlingEffect.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

ItemFlingEffectSchema.loadClass(ItemFlingEffect)

module.exports = mongo.model('ItemFlingEffect', ItemFlingEffectSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
