import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {MoveDamageClass as MoveDamageClassSchema} from "./MoveSchemas.js";

class MoveDamageClass {
  static getMoveDamageClasses(parent, {query, skip, limit}, Models, info) {
    const projection = getProjection(info);

    return Models.moveDamageClass
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getMoveDamageClass(parent, {id}, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.damage_class) {
        id = parent.damage_class;
      }
      if (parent.move_damage_class) {
        id = parent.move_damage_class;
      }
    }

    return Models.moveDamageClass
      .findById({_id: id})
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

MoveDamageClassSchema.loadClass(MoveDamageClass);

export default mongo.model("MoveDamageClass", MoveDamageClassSchema);
