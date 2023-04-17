import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {MoveLearnMethod as MoveLearnMethodSchema} from "./MoveSchemas.js";

class MoveLearnMethod {
  static getMoveLearnMethods(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    return models.moveLearnMethod
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getMoveLearnMethod(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.move_learn_method) {
        id = parent.move_learn_method;
      }
    }

    return models.moveLearnMethod
      .findById({_id: id})
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

MoveLearnMethodSchema.loadClass(MoveLearnMethod);

export default mongo.model("MoveLearnMethod", MoveLearnMethodSchema);
