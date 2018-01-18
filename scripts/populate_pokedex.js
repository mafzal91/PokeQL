var async = require('async')
var axios = require('axios')
var fs = require('fs')
var bluebird = require('bluebird')
var fsReadPromise = bluebird.promisify(fs.readFile)
var utils = require('./utils')

var models = require('../models')

var insert = utils.insert
var filterArray = utils.filterArray
var filterArrays = utils.filterArrays
var findInArray = utils.findInArray

var VersionGroup = models.versionGroup;
var Region = models.region;
var Pokedex = models.pokedex;

const k = (()=>{
  async.waterfall([
    (waterfallcallback) => {
      async.parallel({
        versionGroups: (parallelCallback) => VersionGroup.find({}).exec(parallelCallback),
        regions: (parallelCallback) => Region.find({}).exec(parallelCallback),
        items: (parallelCallback) => fsReadPromise('pokedex.json').then(res => parallelCallback(null, JSON.parse(res))).catch(e=>parallelCallback(e))
      },(err, results) => {
        waterfallcallback(null,results)
      })
    },
    ({versionGroups,regions,items}, waterfallcallback) => {
      var data = items.map(i => insert({
        name: i.name,
        pokeapi_id: i.id,
        region: i.region ? Region.ObjectId(findInArray(regions, "name", i.region.name)._id):undefined,
        version_group: filterArrays(versionGroups, i.version_groups, "name", "name").map(i=>VersionGroup.ObjectId(i._id)),
        is_main_series: i.is_main_series,
        descriptions: i.descriptions.find(k => k.language.name === 'en').description,
      }))
      console.log(JSON.stringify(data, null, 1))
      Pokedex.bulkWrite(data).then((err,results) => waterfallcallback(err, results))
    }
  ], (err, results) => {
    console.log(err);
    process.exit();
  })
})()
