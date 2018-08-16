var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var ContestName = new Schema({
  name:                     { type: String, default: "" },
  color:                    { type: String, default: "" },
  language:                 { type: ObjectId, ref: "Language", default: null },
},{_id: false})

var ContestTypeSchema = new Schema({
  pokeapi_id:               { type: Number, required: true },
  name:                     { type: String, required: true },
  berry_flavor:             { type: ObjectId, ref: "BerryFlavor", default: null },
  names:                    [ContestName],
}, {
  versionKey: false,
  timestamp: true
});


class ContestType {
  static getContestTypes (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);


    return Models.contestType.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .then(data => data)
        .catch(error => error)
  }

  static getContestType(parent, {id}, Models, info) {
    const projection = getProjection(info);

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
        if (parent.contest_type) {
          id = parent.contest_type
        }
      }

    return Models.contestType.findById({_id: id})
        .select(projection)
        .then(data => data)
        .catch(error => error)
  }
}


ContestTypeSchema.pre('save', (next) => next())

ContestTypeSchema.virtual('id').get(function(){ return this._id })

ContestTypeSchema.set('toJSON', {
  virtuals: true
});

ContestTypeSchema.loadClass(ContestType)

module.exports = mongo.model('ContestType', ContestTypeSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
