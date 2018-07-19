var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var ItemFlingEffectSchema = require('./itemSchemas').ItemFlingEffect;

class ItemFlingEffect {
  static getItemFlingEffects (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    let sort = {pokeapi_id: 1}

    return Models.itemFlingEffect.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getItemFlingEffect (parent, {id}, Models, info) {
    const projection = getProjection(info);
    console.log(parent)
    if (parent) {
      // if (parent._id) { id = parent._id }
      if (parent.fling_effect) { id = parent.fling_effect }
    }

    return Models.itemFlingEffect.findById(id)
        .select(projection)
        .exec()
        .then(data => data)
        .catch(error => error)
  }
}

ItemFlingEffectSchema.loadClass(ItemFlingEffect)

module.exports = mongo.model('ItemFlingEffect', ItemFlingEffectSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
