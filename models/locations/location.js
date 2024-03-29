import mongo from "../../services/mongodb.js";
import {Location as LocationSchema} from "./locationSchemas.js";
import {getProjection} from "../../utils/index.js";

class Location {
  static getLocations(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent.locations) {
        query = {_id: {$in: parent.locations}};
      }
    }

    return models.location
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getLocation(parent, {id}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.location) {
        id = parent.location;
      }
    }

    return models.location
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

LocationSchema.loadClass(Location);

export default mongo.model("Location", LocationSchema);
