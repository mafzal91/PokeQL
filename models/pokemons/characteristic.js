import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {Characteristic as CharacteristicSchema} from "./pokemonSchemas.js";

class Characteristic {
  static getCharacteristics(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);
    console.log(parent);
    if (parent) {
      if (parent.characteristics) {
        query = {_id: {$in: parent.characteristics}};
      }
    }

    return models.characteristic
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getCharacteristic(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.characteristic) {
        id = parent.characteristic;
      }
    }
    return models.characteristic
      .findById({_id: id})
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

CharacteristicSchema.loadClass(Characteristic);

export default mongo.model("Characteristic", CharacteristicSchema);
