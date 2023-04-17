import mongo from "../../services/mongodb.js";
import {getProjection} from "../../utils/index.js";
import {Name} from "../commonModels.js";
const Schema = mongo.Schema;

const LanguageSchema = new Schema(
  {
    iso639: {
      required: true,
      type: String,
    },
    iso3166: {
      default: "",
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    names: [Name],
    official: {
      required: true,
      type: Boolean,
    },
    pokeapi_id: {
      required: true,
      type: Number,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  },
);

class Language {
  static getLanguages(parent, {query, skip, limit}, {models}, info) {
    const projection = getProjection(info);
    // console.log(projection)
    return models.language
      .find(query)
      .select(projection)
      .skip(skip)
      .limit(limit)
      .sort({pokeapi_id: 1})
      .then((data) => data)
      .catch((error) => error);
  }

  static getLanguage(parent, {id}, {models}, info) {
    const projection = getProjection(info);
    console.log(parent);
    if (parent) {
      if (parent._id) {
        id = parent._id;
      }
      if (parent.language) {
        id = parent.language;
      }
    }

    return models.language
      .findById(id)
      .select(projection)
      .then((data) => data)
      .catch((error) => error);
  }
}

LanguageSchema.pre("save", function (next) {
  next();
});

LanguageSchema.virtual("id").get(function () {
  return this._id;
});

LanguageSchema.set("toJSON", {
  virtuals: true,
});

LanguageSchema.loadClass(Language);

export default mongo.model("Language", LanguageSchema);
