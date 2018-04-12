var mongo = require('../../services/mongodb');
var { Name, Description } = require('../commonModels')
var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;
var jsonOptions = {
  virtuals: true,
}
var schemaOptions = {
  versionKey: false,
  timestamp: true
}

var MoveAilment = new Schema({
  pokeapi_id:               { type: Number, required: true },
  name:                     { type: String, default: "" },
  names:                    [Name],
  moves:                    [{ type: ObjectId, ref: "Move", }],
}, schemaOptions);

var MoveBattleStyle = new Schema({
  pokeapi_id:     { type: Number, required: true },
  name:           { type: String, required: true },
  names:          [Name],
},schemaOptions)

var MoveCategory = new Schema({
  pokeapi_id:     { type: Number, required: true },
  name:           { type: String, required: true },
  moves:          [{ type: ObjectId, ref: "Move", }],
  descriptions:   [Description],
},schemaOptions)

var MoveDamageClass = new Schema({
  pokeapi_id:     { type: Number, required: true },
  name:           { type: String, required: true },
  descriptions:   [Description],
  moves:          [{ type: ObjectId, ref: "Move", }],
  names:          [Name],
},schemaOptions)

var MoveLearnMethod = new Schema({
  pokeapi_id:     { type: Number, required: true },
  name:           { type: String, required: true },
  descriptions:   [Description],
  names:          [Name],
  version_groups: [{ type: ObjectId, ref: "VersionGroup", default: null }],
},schemaOptions)

var MoveTarget = new Schema({
  pokeapi_id:     { type: Number, required: true },
  name:           { type: String, required: true },
  descriptions:   [Description],
  moves:          [{ type: ObjectId, ref: "Move", }],
  names:          [Name],
},schemaOptions)

MoveAilment.pre('save',(next) => next());
MoveBattleStyle.pre('save',(next) => next());
MoveCategory.pre('save',(next) => next());
MoveDamageClass.pre('save',(next) => next());
MoveLearnMethod.pre('save',(next) => next());
MoveTarget.pre('save',(next) => next());

MoveAilment.virtual('id').get(()=>this._id);
MoveBattleStyle.virtual('id').get(()=>this._id);
MoveCategory.virtual('id').get(()=>this._id);
MoveDamageClass.virtual('id').get(()=>this._id);
MoveLearnMethod.virtual('id').get(()=>this._id);
MoveTarget.virtual('id').get(()=>this._id);

MoveAilment.set('toJSON', jsonOptions);
MoveBattleStyle.set('toJSON', jsonOptions);
MoveCategory.set('toJSON', jsonOptions);
MoveDamageClass.set('toJSON', jsonOptions);
MoveLearnMethod.set('toJSON', jsonOptions);
MoveTarget.set('toJSON', jsonOptions);


module.exports = {
  MoveAilment,
  MoveBattleStyle,
  MoveCategory,
  MoveDamageClass,
  MoveLearnMethod,
  MoveTarget,
}
