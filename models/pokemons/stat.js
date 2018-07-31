var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var StatSchema = require('./pokemonSchemas').Stat

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

class Stat {
  static getStats (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
    // console.log(projection)
    return Models.stat.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getStat (parent, id, Models, info) {
    const projection = getProjection(info);

      if (parent) {
        if (parent._id) {id = parent._id}
        if (parent.stat) {id = parent.stat}
        if (parent.decreased_stat) {id = parent.decreased_stat}
        if (parent.increased_stat) {id = parent.increased_stat}
      }

		return Models.stat.findById(id)
        .select(projection)
        .exec()
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
