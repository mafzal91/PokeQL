import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {Type as TypeSchema} from "./pokemonSchemas.js";

class Type {
  static getTypes(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);

    if (parent) {
      let _id = [];
      if (parent.half_damage_from) {
        _id = [..._id, ...parent.half_damage_from];
      }
      if (parent.no_damage_from) {
        _id = [..._id, ...parent.no_damage_from];
      }
      if (parent.half_damage_to) {
        _id = [..._id, ...parent.half_damage_to];
      }
      if (parent.double_damage_from) {
        _id = [..._id, ...parent.double_damage_from];
      }
      if (parent.no_damage_to) {
        _id = [..._id, ...parent.no_damage_to];
      }
      if (parent.double_damage_to) {
        _id = [..._id, ...parent.double_damage_to];
      }

      if (_id.length) query = {_id: {$in: _id}};
    }

    // Models.types.aggregate([{
    //   $match: {
    //
    //   }
    // }])

    return models.type
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getType(parent, {id}, {models}, info) {
    const projection = getProjection(info);
    // console.log(Models)
    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.natural_gift_type) {
        id = parent.natural_gift_type;
      }
      if (parent.known_move_type) {
        id = parent.known_move_type;
      }
      if (parent.type) {
        id = parent.type;
      }
    }
    // console.log("AFTER", id)
    // if(!id){ console.log("NULL!!!", parent); return null }

    return models.type
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

TypeSchema.pre("save", function (next) {
  next();
});

TypeSchema.virtual("id").get(function () {
  return this._id;
});

TypeSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
  },
  virtuals: true,
});

TypeSchema.loadClass(Type);

export default mongo.model("Type", TypeSchema);
