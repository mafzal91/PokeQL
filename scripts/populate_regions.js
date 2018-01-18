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
        versionGroup: (parallelCallback) => VersionGroup.find({}).exec(parallelCallback),
        generations: (parallelCallback) => Generation.find({}).exec(parallelCallback),
        pokedexes: (parallelCallback) => Pokedex.find({}).exec(parallelCallback),
        locations: (parallelCallback) => Location.find({}).exec(parallelCallback),
        items: (parallelCallback) => fsReadPromise('region.json').then(res => parallelCallback(null, JSON.parse(res))).catch(e=>parallelCallback(e))
      },(err, results) => {
        waterfallcallback(null,results)
      })
    },
    ({versionGroup,generations,pokedexes,locations,items}, waterfallcallback) => {
      var data = items.map(i => update({pokeapi_id: i.id},{
        pokedexes: filterArrays(pokedexes, i.pokedexes, "name", "name").map(k => Pokedex.ObjectId(k._id)),
        version_groups: filterArrays(versionGroup, i.version_groups, "name", "name").map(k => VersionGroup.ObjectId(k._id)),
        main_generation: Generation.ObjectId(findInArray(generations, "name", i.main_generation.name)._id),
        locations: filterArrays(locations, i.locations, "name", "name").map(k => Location.ObjectId(k._id)),
      }))
      Region.bulkWrite(data).then((err,results) => waterfallcallback(err, results))
    }
  ], (err, results) => {
    console.log(err);
    process.exit();
  })
})()
