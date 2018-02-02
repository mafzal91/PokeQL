var mongo = require('../services/mongodb');
var { getProjection } = require('../utils');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var DamageRelations = new Schema({
  half_damage_from:    [{ type: ObjectId, ref: 'Type',}],
  no_damage_from:      [{ type: ObjectId, ref: 'Type',}],
  half_damage_to:      [{ type: ObjectId, ref: 'Type',}],
  double_damage_from:  [{ type: ObjectId, ref: 'Type',}],
  no_damage_to:        [{ type: ObjectId, ref: 'Type',}],
  double_damage_to:    [{ type: ObjectId, ref: 'Type',}],
},{_id: false})

var TypeSchema = new Schema({
  pokeapi_id:              { type: Number, required: true },
  name:                    { type: String, required: true },
  generation:              { type: ObjectId, ref: 'Generation', required: true },
  damage_relations:        { type: DamageRelations, default: {} },
}, {
  versionKey: false,
  timestamp: true
});

class Type {
  static getTypes (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
    // console.log(projection)
    return new Promise((resolve, reject) => {

      Models.type.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getType (parent, id, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) { id = parent._id }
        if(parent.type) { id = parent.type }
      }

      Models.type.findById(id)
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getDamageRelations (parent, {query = {}}, Models, info, field) {
    const projection = getProjection(info);
    console.log(parent);console.log(projection);console.log(field);
    return new Promise((resolve, reject) => {

      if (parent) {
        Object.keys(projection).forEach(key => {
          query._id = {$in: parent[field].map(i => Models.type.ObjectId(i))}
        })
      }
      Models.type.find(query)
        .select(projection)
        .exec()
        .then(data => {resolve(data)})
        .catch(error => {reject(error)})
    })
  }
}

TypeSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id;
  },
});

TypeSchema.loadClass(Type)

module.exports = mongo.model('Type', TypeSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
