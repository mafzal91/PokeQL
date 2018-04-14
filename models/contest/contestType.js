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

    return new Promise((resolve, reject) => {

      Models.contestType.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getContestType(parent, {id}, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {

      if (parent) {
        if (parent._id) {
          id = parent._id
        }
      }

      Models.contestType.findById({_id:id})
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}


ContestTypeSchema.pre('save', (next) => next())

ContestTypeSchema.virtual('id').get(() => this._id)

ContestTypeSchema.set('toJSON', {
  virtuals: true
});

ContestTypeSchema.loadClass(ContestType)

module.exports = mongo.model('ContestType', ContestTypeSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
