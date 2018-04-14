var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var { FlavorText } = require('../commonModels')
var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var SuperContestEffectSchema = new Schema({
  pokeapi_id:               { type: Number, required: true },
  appeal:                   { type: Number, default: null },
  flavor_text_entries:      [FlavorText],
  moves:                    [{ type: ObjectId, ref: "Move", default: null}],
}, {
  versionKey: false,
  timestamp: true
});

class SuperContestEffect {
  static getSuperContestEffects (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.superContestEffect.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getSuperContestEffect(parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.superContestEffect.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}


SuperContestEffectSchema.pre('save', (next) => next())

SuperContestEffectSchema.virtual('id').get(() => this._id)

SuperContestEffectSchema.set('toJSON', {
  virtuals: true
});

SuperContestEffectSchema.loadClass(SuperContestEffect)

module.exports = mongo.model('SuperContestEffect', SuperContestEffectSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
