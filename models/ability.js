var mongo = require('../services/mongodb');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var FlavorText = new Schema({
  text: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: ""
  },
  version_group:{
    type: String,
    default: ""
  }
},{
  _id: false,
})

var EffectEntry = new Schema({
  short_effect: {
    type: String,
    default: "",
  },
  effect: {
    type: String,
    default: ""
  },
  language:{
    type: String,
    default: ""
  }
},{
  _id: false,
})

var EffectChange = new Schema({
  effect_entries: [{
    effect: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: ""
    },
  }],
  version_group: {
    type: String,
    default: ""
  }
})

var Ability = new Schema({
  pokeapi_id:              { type: Number, required: true },
  name:                    { type: String, required: true },
  flavor_texts:            { type: [FlavorText], default: [] },
  is_main_series:          { type: Boolean, default: false },
  generation:              { type: ObjectId, ref: 'Generation' },
  effect_entries:          { type: [EffectEntry], default: [] },
  effect_changes:          { type: [EffectChange], default: [] }
}, {
  versionKey: false,
  timestamp: true
});

Ability.pre('save', function(next) {
  next();
});

Ability.virtual('id').get(function () {
  return this._id;
});

Ability.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id;
  },
});

module.exports = mongo.model('Ability', Ability);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
