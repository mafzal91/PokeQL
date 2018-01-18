var mongo = require('../services/mongodb');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var DamageClass = new Schema({
  pokeapi_id:               { type: Number, required: true },
  name:                    { type: String, required: true },
  description:              { type: String, required: true },
}, {
  versionKey: false,
  timestamp: true
});

DamageClass.pre('save', function(next) {
  next();
});

DamageClass.virtual('id').get(function () {
  return this._id;
});

DamageClass.set('toJSON', {
  virtuals: true
});

module.exports = mongo.model('DamageClass', DamageClass);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
