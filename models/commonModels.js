var mongo = require('../services/mongodb');
var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var Description = new Schema({
  description:          { type: String, default: "" },
  language:             { type: ObjectId, ref: "Language", default: null },
},{_id: false});
var Effect = new Schema({
  effect:               { type: String, default: "" },
  language:             { type: ObjectId, ref: "Language", default: null },
},{_id: false});
var Encounter = new Schema({
  min_level:            { type: Number, default: 0 },
  max_level:            { type: Number, default: 0 },
  condition_values:     [{ type: ObjectId, ref: 'EncounterConditionValue', default: null}],
  chance:               { type: Number, default: 0 },
  method:               { type: ObjectId, ref: 'EncounterMethod', default: null },
},{_id: false});
var FlavorText = new Schema({
  flavor_text:          { type: String, default: "" },
  language:             { type: ObjectId, ref: "Language", default: null },
},{_id: false});
var FlavorText1 = new Schema({
  flavor_text:          { type: String, default: "" },
  language:             { type: ObjectId, ref: "Language", default: null },
  version_group:        { type: ObjectId, ref: "VersionGroup", default: null },
},{_id: false,})
var VersionFlavorText = new Schema({
  flavor_text:          { type: String, default: "" },
  language:             { type: ObjectId, ref: "Language", default: null },
  version:              { type: ObjectId, ref: "Version", default: null },
},{_id: false});
var GenerationGameIndex = new Schema({
  game_index:           { type: Number, default: 0 },
  generation:           { type: ObjectId, ref: "Generation", default: null },
},{_id: false});
var MachineVersionDetail = new Schema({
  machine:              { type: ObjectId, ref: "Machine", default: null },
  version_group:        { type: ObjectId, ref: "VersionGroup", default: null },
},{_id: false});
var Name = new Schema({
  name:                 { type: String, default: "" },
  language:             { type: ObjectId, ref: "Language", default: null },
},{_id: false});
var VerboseEffect = new Schema({
  effect:               { type: String, default: "" },
  short_effect:         { type: String, default: "" },
  language:             { type: ObjectId, ref: "Language", default: null },
},{_id: false});
var VersionEncounterDetail = new Schema({
  version:              { type: ObjectId, ref: "Version", default: null },
  max_chance:           { type: Number, default: 0 },
  encounter_details:    [Encounter],
},{_id: false});
var VersionGameIndex = new Schema({
  game_index:           { type: Number, default: 0 },
  version:              { type: ObjectId, ref: "Version", default: null },
},{_id: false});
var VersionGroupFlavorText = new Schema({
  text:                 { type: String, default: "" },
  language:             { type: ObjectId, ref: "Language", default: null },
  version_group:        { type: ObjectId, ref: "VersionGroup", default: null },
},{_id: false});


module.exports = {
  Description,
  Effect,
  Encounter,
  FlavorText,
  FlavorText1,
  VersionFlavorText,
  GenerationGameIndex,
  MachineVersionDetail,
  Name,
  VerboseEffect,
  VersionEncounterDetail,
  VersionGameIndex,
  VersionGroupFlavorText,
}
