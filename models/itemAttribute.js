var mongo = require('../services/mongodb');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var fields = {
  all: 'pokeapi_id name'
}

var ItemAttribute = new Schema({
  pokeapi_id:              { type: Number, required: true },
  name:                    { type: String, required: true },
  description:             { type: String, required: true }
}, {
  versionKey: false,
  timestamp: true
});

ItemAttribute.pre('save', function(next) {
  next();
});

ItemAttribute.virtual('id').get(function () {
  return this._id;
});

ItemAttribute.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id;
  },
});

module.exports = mongo.model('ItemAttribute', ItemAttribute);

module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
