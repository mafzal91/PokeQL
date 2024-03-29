import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {PalParkArea as PalParkAreaSchema} from "./locationSchemas.js";

class PalParkArea {
  static getPalParkAreas(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    return models.palParkArea
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getPalParkArea(parent, {id}, {models}, info) {
    const projection = getProjection(info);
    console.log(parent);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.area) {
        id = parent.area;
      }
    }

    return models.palParkArea
      .findById({_id: id})
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

PalParkAreaSchema.loadClass(PalParkArea);

export default mongo.model("PalParkArea", PalParkAreaSchema);
