var mongo = require('../../services/mongodb');
var {Name} = require('../commonModels')
var { getProjection } = require('../../utils');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var VersionSchema = new Schema({
  name:                   { type: String, required: true },
  pokeapi_id:             { type: Number, required: true },
  names:                  [Name],
  version_group:          { type: ObjectId, ref: "VersionGroup", default: null },
}, {
  versionKey: false,
  timestamp: true
});

class Version {
  static getVersions (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      Models.version.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getVersion (parent, id, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      if (parent) {
        // if (parent._id) {id = parent._id}
        // if (parent.stat) {id = parent.stat}
      }

      Models.version.findById(id)
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

VersionSchema.pre('save', function(next) {
  next();
});

VersionSchema.virtual('id').get(function () {
  return this._id;
});

VersionSchema.set('toJSON', {
  virtuals: true
});

VersionSchema.loadClass(Version)

module.exports = mongo.model('Version', VersionSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
