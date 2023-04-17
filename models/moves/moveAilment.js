import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {MoveAilment as MoveAilmentSchema} from "./MoveSchemas.js";

class MoveAilment {
  static getMoveAilments(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    return models.moveAilment
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getMoveAilment(parent, {id}, {models}, info) {
    const projection = getProjection(info);
    if (parent) {
      console.log("MOVE AILMENT", parent);
      if (parent._id) {
        id = parent._id;
      }
      if (parent.ailment) {
        id = parent.ailment;
      }
    }

    return models.moveAilment
      .findById({_id: id})
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

MoveAilmentSchema.loadClass(MoveAilment);

export default mongo.model("MoveAilment", MoveAilmentSchema);
