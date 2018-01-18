var mongo = require('../services/mongodb');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var fields = {
  all: 'pokeapi_id name generation damage_relations'
}

var DamageRelations = new Schema({
  half_damage_from:    [{ type: ObjectId, ref: 'Type',}],
  no_damage_from:      [{ type: ObjectId, ref: 'Type',}],
  half_damage_to:      [{ type: ObjectId, ref: 'Type',}],
  double_damage_from:  [{ type: ObjectId, ref: 'Type',}],
  no_damage_to:        [{ type: ObjectId, ref: 'Type',}],
  double_damage_to:    [{ type: ObjectId, ref: 'Type',}],
},{_id: false})

var Type = new Schema({
  pokeapi_id:              { type: Number, required: true },
  name:                    { type: String, required: true },
  generation:              { type: ObjectId, ref: 'Generation', required: true },
  damage_relations:        { type: DamageRelations, default: {} },
}, {
  versionKey: false,
  timestamp: true
});

Type.pre('save', function(next) {
  next();
});

Type.virtual('id').get(function () {
  return this._id;
});

Type.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id;
  },
});

module.exports = mongo.model('Type', Type);

module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
