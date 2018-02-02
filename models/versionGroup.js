var mongo = require('../services/mongodb');
var { getProjection } = require('../utils');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var VersionGroupSchema = new Schema({
  name:                   { type: String, required: true },
  pokeapi_id:             { type: Number, required: true },
  generation:             { type: ObjectId, ref: 'Generation', required: true },
  regions:                [{ type: ObjectId, ref: 'Region', default: null }],
  pokedexes:              [{ type: ObjectId, ref: 'Pokedex', default: null }],
  order:                  { type: Number, required: true },
}, {
  versionKey: false,
  timestamp: true
});

class VersionGroup {
  static getVersionGroups (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      Models.versionGroup.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getVersionGroup (parent, id, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      if (parent) {
        // if (parent._id) {id = parent._id}
        // if (parent.stat) {id = parent.stat}
      }

      Models.versionGroup.findById(id)
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

VersionGroupSchema.pre('save', function(next) {
  next();
});

VersionGroupSchema.virtual('id').get(function () {
  return this._id;
});

VersionGroupSchema.set('toJSON', {
  virtuals: true
});

VersionGroupSchema.loadClass(VersionGroup)

module.exports = mongo.model('VersionGroup', VersionGroupSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
