var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');

var ItemSchema = require('./itemSchemas').Item;

class Item {
  static getItems (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return Models.item.find(query)
      .select(projection)
      .skip(skip)
      .limit(limit).sort({pokeapi_id: 1})
      .exec()
      .then(data => data)
      .catch(error => error)
  }

  static getItem (parent, {id}, Models, info) {
    const projection = getProjection(info);

    //TODO fix to select the id for the correct file when parent has for multiple fields of the same type
    if (parent) {
      if(parent._id) { id = parent._id }
      if(parent.item) { id = parent.item }
      if(parent.baby_trigger_item) { id = parent.baby_trigger_item }
      if(parent.held_item) { id = parent.held_item }
    }

    console.log(parent.item)
    console.log(id)
    console.log("__________________________________")

    return Models.item.findById(id)
      .select(projection)
      .exec()
      .then(data => data)
      .catch(error => error)
  }
}

ItemSchema.pre('save', (next) => next())

ItemSchema.virtual('id').get(function() {
  return this._id;
});

ItemSchema.set('toJSON', {
  virtuals: true
});

ItemSchema.loadClass(Item)

module.exports = mongo.model('Item', ItemSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
