var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var EggGroupSchema = require('./pokemonSchemas').EggGroup;

class EggGroup {
  static getEggGroups (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
		return Models.eggGroup.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getEggGroup (parent, {id}, Models, info) {
    const projection = getProjection(info);


      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

    return Models.eggGroup.findById(id)
        .select(projection)
        .exec()
        .then(data => data)
        .catch(error => error)
  }
}

EggGroupSchema.loadClass(EggGroup)

module.exports = mongo.model('EggGroup', EggGroupSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
