var mongo = require('../services/mongodb');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;


var Stat = new Schema({
  pokeapi_id:              { type: Number, required: true },
  name:                    { type: String, required: true },
  is_battle_only:          { type: Boolean, required: true },
}, {
  versionKey: false,
  timestamp: true
});

Stat.pre('save', function(next) {
  next();
});

Stat.virtual('id').get(function () {
  return this._id;
});

Stat.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id;
  },
});

module.exports = mongo.model('Stat', Stat);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
