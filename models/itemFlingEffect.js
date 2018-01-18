var mongo = require('../services/mongodb');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var fields = {
  all: 'pokeapi_id name'
}

var EffectEntry = new Schema({
  effect: {type: String, default: "" },
})

var ItemFlingEffect = new Schema({
  pokeapi_id:              { type: Number, required: true },
  name:                    { type: String, required: true },
  effect_entries:          { type: [EffectEntry], default: [] },
}, {
  versionKey: false,
  timestamp: true
});

ItemFlingEffect.pre('save', function(next) {
  next();
});

ItemFlingEffect.virtual('id').get(function () {
  return this._id;
});

ItemFlingEffect.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id;
  },
});

module.exports = mongo.model('ItemFlingEffect', ItemFlingEffect);

module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
