var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');

var GrowthRateSchema = require('./pokemonSchemas').GrowthRate;

class GrowthRate {
  static getGrowthRates (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
		return Models.growthRate.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getGrowthRate (parent, {id}, Models, info) {
    const projection = getProjection(info);


      if (parent) {
        if (parent._id) {id = parent._id }
        if (parent.growth_rate) {id = parent.growth_rate }
      }

		return Models.growthRate.findById(id)
        .select(projection)
        .exec()
        .then(data => data)
        .catch(error => error)
  }
}

GrowthRateSchema.loadClass(GrowthRate)

module.exports = mongo.model('GrowthRate', GrowthRateSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
