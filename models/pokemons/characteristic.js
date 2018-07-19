var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var CharacteristicSchema = require('./pokemonSchemas').Characteristic;

class Characteristic {
  static getCharacteristics (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
		return Models.characteristic.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getCharacteristic (parent, {id}, Models, info) {
    const projection = getProjection(info);


      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }
      return Models.characteristic.findById(id)
        .select(projection)
        .exec()
        .then(data => data)
        .catch(error => error)
  }
}

CharacteristicSchema.loadClass(Characteristic)

module.exports = mongo.model('Characteristic', CharacteristicSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
