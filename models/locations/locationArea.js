import mongo from "../../services/mongodb.js";
import {LocationArea as LocationAreaSchema} from "./locationSchemas.js";
import {getProjection} from "../../utils/index.js";

class LocationArea {
  static getLocationAreas(parent, {query, skip, limit}, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent.areas) {
        query = {_id: {$in: parent.areas}};
      }
    }

    return Models.locationArea
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getLocationArea(parent, {id}, Models, info) {
    const projection = getProjection(info);
    console.log(parent);
    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.location_area) {
        id = parent.location_area;
      }
    }

    return Models.locationArea
      .findById(id)
      .select(projection)
      .exec()
      .then((data) => data)
      .catch((error) => error);
  }
}

LocationAreaSchema.loadClass(LocationArea);

export default mongo.model("LocationArea", LocationAreaSchema);
