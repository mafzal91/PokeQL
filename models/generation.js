var mongo = require('../services/mongodb');
var { getProjection } = require('../utils');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var GenerationSchema = new Schema({
  pokeapi_id:         { type: Number, required: true },
  name:              { type: String, required: true },
}, {
  versionKey: false,
  timestamp: true
});

class Generation {
  static getGenerations (parent, { query = {}, skip = null, limit = null }, { Models }, info) {
console.log("test");
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      if (parent) {
        // if (parent.users) {
        //   query._id = { $in: parent.users };
        // }
        console.log("GENERATION parent", parent)
      }
      console.log(query)
      Models.Generation.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getGeneration (parent, { id }, { Models }, info) {

    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      console.log('getUser', parent, id);

      Models.Users.findById(id)
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

// Generation.pre('save', function(next) {
//   next();
// });
//
// Generation.virtual('id').get(function () {
//   return this._id;
// });

GenerationSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id;
  },
});

GenerationSchema.loadClass(Generation)

module.exports = mongo.model('Generation', GenerationSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
