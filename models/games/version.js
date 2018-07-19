var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var {Name} = require('../commonModels')

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

    return Models.version.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getVersion (parent, id, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      // if (parent._id) {id = parent._id}
      if (parent.version) {id = parent.version}
    }

    return Models.version.findById(id)
        .select(projection)
        .exec()
        .then(data => data)
        .catch(error => error)
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
