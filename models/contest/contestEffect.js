var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var {Effect, FlavorText} = require('../commonModels')
var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var ContestEffectSchema = new Schema({
  pokeapi_id:               { type: Number, default: 0 },
  appeal:                   { type: Number, default: null },
  jam:                      { type: Number, default: null },
  effect_entries:           { type: [Effect], default: [] },
  flavor_text_entries:      { type: [FlavorText], default: [] },
}, {
  versionKey: false,
  timestamp: true
});


class ContestEffect {
  static getContestEffects (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);


    return Models.contestEffect.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getContestEffect(parent, {id}, Models, info) {
    const projection = getProjection(info);

      if (parent) {
        if (parent._id) { id = parent._id }
        if (parent.contest_effect) { id = parent.contest_effect }
      }

    return Models.contestEffect.findById({_id: id})
        .select(projection)
        .exec()
        .then(data => data)
        .catch(error => error)
  }
}


ContestEffectSchema.pre('save', (next) => next())

ContestEffectSchema.virtual('id').get(function(){ return this._id })

ContestEffectSchema.set('toJSON', {
  virtuals: true
});

ContestEffectSchema.loadClass(ContestEffect)

module.exports = mongo.model('ContestEffect', ContestEffectSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
