import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {MoveBattleStyle as MoveBattleStyleSchema} from "./MoveSchemas.js";

class MoveBattleStyle {
  static getMoveBattleStyles(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    return models.moveBattleStyle
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getMoveBattleStyle(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.move_battle_style) {
        id = parent.move_battle_style;
      }
    }

    return models.moveBattleStyle
      .findById({_id: id})
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

MoveBattleStyleSchema.loadClass(MoveBattleStyle);

export default mongo.model("MoveBattleStyle", MoveBattleStyleSchema);
