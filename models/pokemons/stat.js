var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var StatSchema = require('./pokemonSchemas').Stat

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

class Stat {
  static getStats (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
    // console.log(projection)
    return new Promise((resolve, reject) => {

      Models.stat.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getStat (parent, id, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {id = parent._id}
        if (parent.stat) {id = parent.stat}
      }

      Models.stat.findById(id)
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
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
