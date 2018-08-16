var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var { Name } = require('../commonModels')
var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var LanguageSchema = new Schema({
  pokeapi_id:            { type: Number, required: true },
  name:                  { type: String, required: true },
  official:              { type: Boolean, required: true },
  iso639:                { type: String, required: true },
  iso3166:               { type: String, default: "" },
  names:                 [Name],
}, {
  versionKey: false,
  timestamp: true
});

class Language {
  static getLanguages (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
    // console.log(projection)
    return Models.language.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .then(data => data)
        .catch(error => error)
  }

  static getLanguage (parent, {id}, Models, info) {
    const projection = getProjection(info);
    console.log(parent)
    if (parent) {
      if (parent._id) {
        id = parent._id
      }
      if (parent.language) {
        id = parent.language
      }
    }

    return Models.language.findById(id)
      .select(projection)
      .then(data => data)
      .catch(error => error)
  }
}

LanguageSchema.pre('save', function(next) {
  next();
});

LanguageSchema.virtual('id').get(function () {
  return this._id;
});

LanguageSchema.set('toJSON', {
  virtuals: true
});

LanguageSchema.loadClass(Language)

module.exports = mongo.model('Language', LanguageSchema);

module.exports.ObjectId = mongo.Types.ObjectId;
