var mongo = require('../services/mongodb');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var Version = new Schema({
  name:                   { type: String, required: true },
  pokeapi_id:             { type: Number, required: true },
  version_group:          { type: ObjectId, ref: "VersionGroup", default: null },
}, {
  versionKey: false,
  timestamp: true
});

Version.pre('save', function(next) {
  next();
});

Version.virtual('id').get(function () {
  return this._id;
});

Version.set('toJSON', {
  virtuals: true
});

module.exports = mongo.model('Version', Version);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
