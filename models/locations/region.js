var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var RegionSchema = require('./locationSchemas').Region;

class Region {
  static getRegions (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
    // console.log(projection)
    return Models.region.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .exec()
        .then(data => data)
        .catch(error => error)
  }

  static getRegion (parent, {id}, Models, info) {
    const projection = getProjection(info);
console.log("!!!", parent)
    if (parent) {
      if (parent._id) { id = parent._id }
      if (parent.region) { id = parent.region }
      if (parent.main_region) { id = parent.main_region }
      if (parent.location) { id = parent.location }
    }

    return Models.region.findById(id)
        .select(projection)
        .exec()
        .then(data => data)
        .catch(error => error)
  }
}

RegionSchema.pre('save', function(next) {
  next();
});

RegionSchema.virtual('id').get(function () {
  return this._id;
});

RegionSchema.set('toJSON', {
  virtuals: true
});

RegionSchema.loadClass(Region)

module.exports = mongo.model('Region', RegionSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
