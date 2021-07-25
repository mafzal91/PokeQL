import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";

const PokeathlonStatSchema = require("./pokemonSchemas").PokeathlonStat;

class PokeathlonStat {
  static getPokeathlonStats(parent, {query, skip, limit}, Models, info) {
    const projection = getProjection(info);
    return Models.pokeathlonStat
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getPokeathlonStat(parent, {id}, Models, info) {
    const projection = getProjection(info);

    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.pokeathlon_stat) {
        id = parent.pokeathlon_stat;
      }
    }
    return Models.pokeathlonStat
      .findById({_id: id})
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

PokeathlonStatSchema.loadClass(PokeathlonStat);

export default mongo.model("PokeathlonStat", PokeathlonStatSchema);
