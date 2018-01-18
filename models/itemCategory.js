var mongo = require('../services/mongodb');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var fields = {
  all: 'pokeapi_id name categories'
}

var ItemCategory = new Schema({
  pokeapi_id:              { type: Number, required: true },
  name:                    { type: String, required: true },
}, {
  versionKey: false,
  timestamp: true
});

ItemCategory.pre('save', function(next) {
  next();
});

ItemCategory.virtual('id').get(function () {
  return this._id;
});

ItemCategory.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id;
  },
});

module.exports = mongo.model('ItemCategory', ItemCategory);

module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
