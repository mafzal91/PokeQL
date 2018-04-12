var mongo = require('../../services/mongodb');
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

    return new Promise((resolve, reject) => {

      Models.contestEffect.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getContestEffect(parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.contestEffect.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}


ContestEffectSchema.pre('save', (next) => next())

ContestEffectSchema.virtual('id').get(() => this._id)

ContestEffectSchema.set('toJSON', {
  virtuals: true
});

ContestEffectSchema.loadClass(ContestEffect)

module.exports = mongo.model('ContestEffect', ContestEffectSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
