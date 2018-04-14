var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var CharacteristicSchema = require('./pokemonSchemas').Characteristic;

class Characteristic {
  static getCharacteristics (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);

    return new Promise((resolve, reject) => {

      Models.characteristic.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getCharacteristic (parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.characteristic.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

CharacteristicSchema.loadClass(Characteristic)

module.exports = mongo.model('Characteristic', CharacteristicSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
