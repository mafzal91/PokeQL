var mongo = require('../../services/mongodb');
var { VerboseEffect, Effect, FlavorText1, Name, MachineVersionDetail } = require('../commonModels');
var { AbilityEffectChange } = require('../pokemons/pokemonSchemas').subSchema;
var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var ContestCombo = new Schema({
  normal: {
    use_before:             [{type: ObjectId, ref: "Move", }],
    use_after:              [{type: ObjectId, ref: "Move", }],
  },
  super: {
    use_before:             [{type: ObjectId, ref: "Move", }],
    use_after:              [{type: ObjectId, ref: "Move", }],
  },
},{_id: false})

var MoveMeta = new Schema({
  ailment:                  { type: ObjectId, ref: "MoveAilment", default: null },
  category:                 [{ type: ObjectId, ref: "Move", }],
  min_hits:                 { type: Number, default: 0 },
  max_hits:                 { type: Number, default: 0 },
  min_turns:                { type: Number, default: 0 },
  max_turns:                { type: Number, default: 0 },
  drain:                    { type: Number, default: 0 },
  healing:                  { type: Number, default: 0 },
  crit_rate:                { type: Number, default: 0 },
  ailment_chance:           { type: Number, default: 0 },
  flinch_chance:            { type: Number, default: 0 },
  stat_chance:              { type: Number, default: 0 },
},{_id: false})

var MovePastValue = new Schema({
  accuracy:                 { type: Number, default: 0 },
  effect_chance:            { type: Number, default: 0 },
  power:                    { type: Number, default: 0 },
  pp:                       { type: Number, default: 0 },
  effect_entries:           { type: [VerboseEffect], default: [] },
  type:                     { type: ObjectId, ref: "Type", default: null },
  version_group:            { type: ObjectId, ref: "VersionGroup", default: null },
},{_id: false})

var MoveStatChange = new Schema({
  change:                   { type: Number, default: 0 },
  stat:                     { type: ObjectId, ref: "Stat", default: null },
},{_id: false})

var MoveSchema = new Schema({
  pokeapi_id:               { type: Number, required: true },
  name:                     { type: String, required: true },
  accuracy:                 { type: Number, default: 0 },
  effect_chance:            { type: Number, default: 0 },
  pp:                       { type: Number, default: 0 },
  priority:                 { type: Number, default: 0 },
  power:                    { type: Number, default: 0 },
  contest_combos:           { type: ContestCombo },
  contest_type:             { type: ObjectId, ref: "ContestType", default: null },
  contest_effect:           { type: ObjectId, ref: "ContestEffect", default: null },
  damage_class:             { type: ObjectId, ref: "MoveDamageClass", default: null },
  effect_entries:           { type: [VerboseEffect], default: [] },
  effect_changes:           { type: [AbilityEffectChange], default: [] },
  flavor_text_entries:      { type: [FlavorText1], default: [] },
  generation:               { type: ObjectId, ref: "Generation", default: null},
  machines:                 { type: [MachineVersionDetail], default: [] },
  meta:                     { type: MoveMeta },
  names:                    { type: [Name], default: [] },
  past_values:              { type: [MovePastValue], default: [] },
  stat_changes:             { type: [MoveStatChange], default: [] },
  super_contest_effect:     { type: ObjectId, ref: "SuperContestEffect", default: null },
  target:                   { type: ObjectId, ref: "MoveTarget", default: null },
  type:                     { type: ObjectId, ref: "Type", default: null },
}, {
  versionKey: false,
  timestamp: true
});

class Move {
  static getMoves (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.move.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getMove (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.move.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

MoveSchema.pre('save', function(next) {
  next();
});

MoveSchema.virtual('id').get(function () {
  return this._id;
});

MoveSchema.set('toJSON', {
  virtuals: true
});

MoveSchema.loadClass(Move)

module.exports = mongo.model('Move', MoveSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
