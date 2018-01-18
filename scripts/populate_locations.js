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

var VersionGroup = models.versionGroup;
var Generation = models.generation;
var Region = models.region;
var Pokedex = models.pokedex;
var Location = models.location;

const k = (()=>{
  async.waterfall([
    (waterfallcallback) => {
      async.parallel({
        regions: (parallelCallback) => Region.find({}).exec(parallelCallback),
        items: (parallelCallback) => fsReadPromise('locations.json').then(res => parallelCallback(null, JSON.parse(res))).catch(e=>parallelCallback(e))
      },(err, results) => {
        waterfallcallback(null,results)
      })
    },
    ({regions,items}, waterfallcallback) => {
      var data = items.map((i,index) => {
        return update(
          {pokeapi_id: i.id},
          {
            region:i.region ? Region.ObjectId(findInArray(regions, "name", i.region.name)._id):undefined,
          })
        })
      Location.bulkWrite(data).then((err,results) => waterfallcallback(err, results))
    }
  ], (err, results) => {
    console.log(err);
    process.exit();
  })
})()
