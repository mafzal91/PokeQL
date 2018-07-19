var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var TypeSchema = require('./pokemonSchemas').Type

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

class Type {
  static getTypes (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
    // console.log(projection)
    return Models.type.find(query)
      .select(projection)
      .skip(skip)
      .limit(limit).sort({pokeapi_id: 1})
      .exec()
      .then(data => data)
      .catch(error => error)
  }

  static getType (parent, {id}, Models, info) {
    const projection = getProjection(info);
    console.log("TYPE", parent)
    if (parent) {
      if (parent._id) {id = parent._id}
      if (parent.natural_gift_type) {id = parent.natural_gift_type}
      if (parent.known_move_type) {id = parent.known_move_type}
    }
    // console.log("AFTER", id)
    // if(!id){ console.log("NULL!!!", parent); return null }

    return Models.type.findById(id)
      .select(projection)
      .exec()
      .then(data => data)
      .catch(error => error)
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
