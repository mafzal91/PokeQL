var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var StatSchema = require('./pokemonSchemas').Stat

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

class Stat {
  static getStats (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
    console.log(projection)

    if (parent) {
      if (parent.increase) { query = {_id: { $in: parent.increase } } }
      if (parent.decrease) { query = {_id: { $in: parent.decrease } } }
    }

    return Models.stat.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .then(data => data)
        .catch(error => error)
  }

  static getStat (parent, id, Models, info) {
    const projection = getProjection(info);

      if (parent) {
        if (parent._id) {id = parent._id}
        if (parent.stat) {id = parent.stat}
      }

		return Models.stat.findById(id)
        .select(projection)
        .then(data => data)
        .catch(error => error)
  }

}

StatSchema.pre('save', function(next) {
  next();
});

StatSchema.virtual('id').get(function () {
  return this._id;
});

StatSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id;
  },
});


StatSchema.loadClass(Stat)

module.exports = mongo.model('Stat', StatSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
