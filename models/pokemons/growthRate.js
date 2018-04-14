var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');

var GrowthRateSchema = require('./pokemonSchemas').GrowthRate;

class GrowthRate {
  static getGrowthRates (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.growthRate.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getGrowthRate (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.growthRate.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

GrowthRateSchema.loadClass(GrowthRate)

module.exports = mongo.model('GrowthRate', GrowthRateSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
