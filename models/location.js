var mongo = require('../services/mongodb');
var { getProjection } = require('../utils');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var GameIndex = new Schema({
  generation:{ type: ObjectId, ref: 'Generation', default: null },
  game_index:{ type: Number, required: true },
}, {
  _id: false,
})

var LocationSchema = new Schema({
  name:                   { type: String, required: true },
  pokeapi_id:             { type: Number, required: true },
  region:                 { type: ObjectId, ref: 'Region', default: null },
  game_indices:           { type: [GameIndex], default: [] },
  areas:                  [{ type: String, default: ""}],
}, {
  versionKey: false,
  timestamp: true
});

class Location {
  static getLocations (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
    // console.log(projection)
    return new Promise((resolve, reject) => {

      Models.location.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getLocation (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {
      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.location.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

LocationSchema.pre('save', function(next) {
  next();
});

LocationSchema.virtual('id').get(function () {
  return this._id;
});

LocationSchema.set('toJSON', {
  virtuals: true
});

LocationSchema.loadClass(Location)

module.exports = mongo.model('Location', LocationSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
