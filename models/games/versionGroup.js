var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var VersionGroupSchema = new Schema({
  pokeapi_id:             { type: Number, required: true },
  name:                   { type: String, required: true },
  order:                  { type: Number, required: true },
  generation:             { type: ObjectId, ref: 'Generation', required: true },
  move_learn_methods:     [{ type: ObjectId, ref: "MoveLearnMethod", default: null}],
  pokedexes:              [{ type: ObjectId, ref: 'Pokedex', default: null}],
  regions:                [{ type: ObjectId, ref: 'Region', default: null}],
  versions:               [{ type: ObjectId, ref: 'Version', default: null}],
}, {
  versionKey: false,
  timestamp: true
});

class VersionGroup {
  static getVersionGroups (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    if(parent){
      if(parent.version_groups) { query = { _id: { $in: parent.version_groups } } }
    }

    return Models.versionGroup.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .then(data => data)
        .catch(error => error)
  }

  static getVersionGroup (parent, {id}, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {id = parent._id}
      if (parent.version_group) {id = parent.version_group}
    }

    return Models.versionGroup.findById(id)
        .select(projection)
        .then(data => data)
        .catch(error => error)
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
