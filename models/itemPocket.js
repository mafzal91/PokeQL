var mongo = require('../services/mongodb');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var fields = {
  all: 'pokeapi_id name categories'
}

var ItemPocket = new Schema({
  pokeapi_id:              { type: Number, required: true },
  name:                    { type: String, required: true },
  categories:              [{ type: ObjectId, ref: 'ItemCategory' }],
}, {
  versionKey: false,
  timestamp: true
});

ItemPocket.pre('save', function(next) {
  next();
});

ItemPocket.virtual('id').get(function () {
  return this._id;
});

ItemPocket.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id;
  },
});

module.exports = mongo.model('ItemPocket', ItemPocket);

module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
