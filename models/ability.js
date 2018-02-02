var mongo = require('../services/mongodb');
var { getProjection } = require('../utils');

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

var AbilitySchema = new Schema({
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


class Ability{
  static getAbilities (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
    // console.log(projection)
    return new Promise((resolve, reject) => {

      Models.ability.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getAbility (parent, id, Models, info) {
    const projection = getProjection(info);
    console.log(parent, projection)
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) { id = parent._id }
        if (parent.ability) { id = parent.ability }
      }

      Models.ability.findById(id)
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }


}

AbilitySchema.pre('save', function(next) {
  next();
});

AbilitySchema.virtual('id').get(function () {
  return this._id;
});

AbilitySchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id;
  },
});

AbilitySchema.loadClass(Ability)

module.exports = mongo.model('Ability', AbilitySchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
