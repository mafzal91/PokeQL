var async = require('async')
var axios = require('axios')
var fs = require('fs')
var bluebird = require('bluebird')
var fsReadPromise = bluebird.promisify(fs.readFile)
var utils = require('./utils')

var models = require('../models')

var insert = utils.insert;
var update = utils.update;
var filterArray = utils.filterArray;
var filterArrays = utils.filterArrays;
var findInArray = utils.findInArray;

var Version = models.version;
var VersionGroup = models.versionGroup;

const k = (()=>{
  async.waterfall([
    (waterfallcallback) => {
      async.parallel({
        versionGroup: (parallelCallback) => VersionGroup.find({}).exec(parallelCallback),
        items: (parallelCallback) => fsReadPromise('version.json').then(res => parallelCallback(null, JSON.parse(res))).catch(e=>parallelCallback(e))
      },(err, results) => {
        waterfallcallback(null,results)
      })
    },
    ({versionGroup, items}, waterfallcallback) => {
      var data = items.map(i => update({pokeapi_id: i.id},{
        version_group: VersionGroup.ObjectId(findInArray(versionGroup, "name", i.version_group.name)._id)
      }))
      Version.bulkWrite(data).then((err,results) => waterfallcallback(err, results))
    }
  ], (err, results) => {
    console.log(err);
    process.exit();
  })
})()
