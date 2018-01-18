var mongo = require('../services/mongodb');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var GameIndex = new Schema({
  generation:{ type: ObjectId, ref: 'Generation', default: null },
  game_index:{ type: Number, required: true },
}, {
  _id: false,
})

var Location = new Schema({
  name:                   { type: String, required: true },
  pokeapi_id:             { type: Number, required: true },
  region:                 { type: ObjectId, ref: 'Region', default: null },
  game_indices:           { type: [GameIndex], default: [] },
  areas:                  [{ type: String, default: ""}],
}, {
  versionKey: false,
  timestamp: true
});

Location.pre('save', function(next) {
  next();
});

Location.virtual('id').get(function () {
  return this._id;
});

Location.set('toJSON', {
  virtuals: true
});

module.exports = mongo.model('Location', Location);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
