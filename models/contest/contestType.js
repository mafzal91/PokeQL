var mongo = require('../../services/mongodb');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var ContestName = new Schema({
  name:                     { type: String, default: "" },
  color:                    { type: String, default: "" },
  language:                 { type: ObjectId, ref: "Language", default: null },
},{_id: false})

var ContestTypeSchema = new Schema({
  pokeapi_id:               { type: Number, required: true },
  name:                     { type: String, required: true },
  berry_flavor:             { type: ObjectId, ref: "BerryFlavor", default: null },
  names:                    [ContestName],
}, {
  versionKey: false,
  timestamp: true
});


ContestTypeSchema.pre('save', function(next) {
  next();
});

ContestTypeSchema.virtual('id').get(function () {
  return this._id;
});

ContestTypeSchema.set('toJSON', {
  virtuals: true
});

// ContestTypeSchema.loadClass(ContestType)

module.exports = mongo.model('ContestType', ContestTypeSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
