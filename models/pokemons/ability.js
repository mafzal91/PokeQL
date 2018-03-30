var mongo = require('../../services/mongodb');
var AbilitySchema = require('./pokemonSchemas').Ability
var { getProjection } = require('../../utils');

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
