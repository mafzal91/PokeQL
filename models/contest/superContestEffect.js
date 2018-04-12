var mongo = require('../../services/mongodb');
var { FlavorText } = require('../commonModels')
var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var SuperContestEffectSchema = new Schema({
  pokeapi_id:               { type: Number, required: true },
  appeal:                   { type: Number, default: null },
  flavor_text_entries:      [FlavorText],
  moves:                    [{ type: ObjectId, ref: "Move", default: null}],
}, {
  versionKey: false,
  timestamp: true
});

SuperContestEffectSchema.pre('save', (next) => next());

SuperContestEffectSchema.virtual('id').get(() => this._id);

SuperContestEffectSchema.set('toJSON', {
  virtuals: true
});

// SuperContestEffectSchema.loadClass(SuperContestEffect)

module.exports = mongo.model('SuperContestEffect', SuperContestEffectSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
