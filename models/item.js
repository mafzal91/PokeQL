var mongo = require('../services/mongodb');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var EffectEntry = new Schema({
  short_effect:{type: String, default: ""},
  effect:{type: String, default: ""}
},{_id: false})

var GameIndex = new Schema({
  generation:{type: ObjectId, ref:"Generation", default: null},
  game_index:{type: Number, default: null}
},{_id: false})

var FlavorTextEntry = new Schema({
  text:{type: String, default: ""},
  version_group:{type: String, default: ""}
},{_id: false})

var Item = new Schema({
  name:                   { type: String, required: true },
  pokeapi_id:              { type: Number, required: true },
  category:               { type: String, required: true },
  fling_effect:           { type: ObjectId, ref: 'ItemFlingEffect', default: null },
  effect_entries:         { type: [EffectEntry], default:[]},
  sprite:                  { type: {}, default: {} },
  game_indices:           { type: [GameIndex], default: [] },
  baby_trigger_for:     { type: String, default: "" },
  cost:                 { type: Number, default: 0 },
  attributes:             [{ type: ObjectId, ref: 'ItemAttribute' }],
  flavor_text_entries:    { type: [FlavorTextEntry], default: [] },
  machines:    { type: [], default: [] },
  fling_power: { type: Number, default: null },
}, {
  versionKey: false,
  timestamp: true
});

Item.pre('save', function(next) {
  next();
});

Item.virtual('id').get(function () {
  return this._id;
});

Item.set('toJSON', {
  virtuals: true
});

module.exports = mongo.model('Item', Item);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
