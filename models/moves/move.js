var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
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
  category:                 { type: ObjectId, ref: "MoveCategory", default: null },
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
  effect_entries:           [VerboseEffect],
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
  contest_combos:           ContestCombo,
  contest_type:             { type: ObjectId, ref: "ContestType", default: null },
  contest_effect:           { type: ObjectId, ref: "ContestEffect", default: null },
  damage_class:             { type: ObjectId, ref: "MoveDamageClass", default: null },
  effect_entries:           [VerboseEffect],
  effect_changes:           [AbilityEffectChange],
  flavor_text_entries:      [FlavorText1],
  generation:               { type: ObjectId, ref: "Generation", default: null},
  machines:                 [MachineVersionDetail],
  meta:                     MoveMeta,
  names:                    [Name],
  past_values:              [MovePastValue],
  stat_changes:             [MoveStatChange],
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

    if(parent){
      if(parent.moves) { query = { _id: { $in: parent.moves } } }
    }

    return Models.move.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getMove (parent, {id}, Models, info) {
    const projection = getProjection(info);

      if (parent) {
        if (parent._id) { id = parent._id }
        if (parent.move) { id = parent.move }
        if (parent.known_move) { id = parent.known_move }
      }

    return Models.move.findById({_id: id})
        .select(projection)
        .exec()
        .then(data => data)
        .catch(error => error)
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
