var mongo = require('../../services/mongodb');
var { Name } = require('../commonModels')
var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;
var jsonOptions = {
  virtuals: true,
}
var schemaOptions = {
  versionKey: false,
  timestamp: true
}
var subSchemaOptions = {
  _id: false
}


var EncounterMethod = new Schema({
  pokeapi_id:                 { type: Number, required: true },
  name:                       { type: String, required: true },
  order:                      { type: Number, default: null },
  names:                      [Name],
}, schemaOptions);

var EncounterCondition = new Schema({
  pokeapi_id:               { type: Number, required: true },
  name:                     { type: String, required: true },
  names:                    [Name],
  values:                   [{ type: ObjectId, ref: "EncounterConditionValue", default: null }],
}, schemaOptions);

var EncounterConditionValue = new Schema({
  pokeapi_id:               { type: Number, required: true },
  name:                     { type: String, required: true },
  condition:                { type: ObjectId, ref: "EncounterCondition", default: null },
  names:                    [Name],
}, schemaOptions);


EncounterMethod.pre('save',next => next());
EncounterCondition.pre('save',next => next());
EncounterConditionValue.pre('save',next => next());

EncounterMethod.virtual('id').get(()=>this._id);
EncounterCondition.virtual('id').get(()=>this._id);
EncounterConditionValue.virtual('id').get(()=>this._id);

EncounterMethod.set('toJSON', jsonOptions);
EncounterCondition.set('toJSON', jsonOptions);
EncounterConditionValue.set('toJSON', jsonOptions);


module.exports = {
  EncounterMethod,
  EncounterCondition,
  EncounterConditionValue,
}
