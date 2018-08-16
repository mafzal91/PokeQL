var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var EggGroupSchema = require('./pokemonSchemas').EggGroup;

class EggGroup {
  static getEggGroups (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent.egg_groups) { query = { _id: { $in: parent.egg_groups } } }
    }

		return Models.eggGroup.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .then(data => data)
        .catch(error => error)
  }

  static getEggGroup (parent, {id}, Models, info) {
    const projection = getProjection(info);


    if (parent) {
      if (parent._id) { id = parent._id }
      if (parent.egg_group) { id = parent.egg_group }
    }

    return Models.eggGroup.findById(id)
        .select(projection)
        .then(data => data)
        .catch(error => error)
  }
}

EggGroupSchema.loadClass(EggGroup)

module.exports = mongo.model('EggGroup', EggGroupSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
