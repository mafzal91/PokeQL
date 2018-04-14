var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var TypeSchema = require('./pokemonSchemas').Type

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

class Type {
  static getTypes (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
    // console.log(projection)
    return new Promise((resolve, reject) => {

      Models.type.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getType (parent, id, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {id = parent._id}
      }

      Models.type.findById(id)
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

}

TypeSchema.pre('save', function(next) {
  next();
});

TypeSchema.virtual('id').get(function () {
  return this._id;
});

TypeSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id;
  },
});


TypeSchema.loadClass(Type)

module.exports = mongo.model('Type', TypeSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
