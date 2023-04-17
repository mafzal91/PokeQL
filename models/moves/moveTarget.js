import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {MoveTarget as MoveTargetSchema} from "./MoveSchemas.js";

class MoveTarget {
  static getMoveTargets(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    return models.moveTarget
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getMoveTarget(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.target) {
        id = parent.target;
      }
    }

    return models.moveTarget
      .findById({_id: id})
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

MoveTargetSchema.loadClass(MoveTarget);

export default mongo.model("MoveTarget", MoveTargetSchema);
