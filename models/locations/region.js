var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var RegionSchema = require('./locationSchemas').Region;

class Region {
  static getRegions (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
    // console.log(projection)
    return new Promise((resolve, reject) => {

      Models.region.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  static getRegion (parent, id, Models, info) {
    const projection = getProjection(info);
    return new Promise((resolve, reject) => {
console.log(parent, projection)
      if (parent) {
        if (parent._id) {id = {_id: parent._id}}
        if (parent.regions) { id = {_id: {$in: parent.regions} } }
        if (parent.region) { id = {_id: parent.region } }
      }

      Models.region.find(id)
        .select(projection)
        .exec()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
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
