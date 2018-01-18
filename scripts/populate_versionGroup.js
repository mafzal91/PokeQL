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
var Generation = models.generation;
var Region = models.region;
var Pokedex = models.pokedex;

const k = (()=>{
  async.waterfall([
    (waterfallcallback) => {
      async.parallel({
        versions: (parallelCallback) => Version.find({}).exec(parallelCallback),
        generations: (parallelCallback) => Generation.find({}).exec(parallelCallback),
        regions: (parallelCallback) => Region.find({}).exec(parallelCallback),
        pokedexes: (parallelCallback) => Pokedex.find({}).exec(parallelCallback),
        items: (parallelCallback) => fsReadPromise('versionGroup.json').then(res => parallelCallback(null, JSON.parse(res))).catch(e=>parallelCallback(e))
      },(err, results) => {
        waterfallcallback(null,results)
      })
    },
    ({versions,generations,regions,pokedexes,items}, waterfallcallback) => {
      // var data = items.map(i => insert({
      //   name: i.name,
      //   pokeapi_id: i.id,
      //   generation: Generation.ObjectId(findInArray(generations, "name", i.generation.name)._id),
      //   regions: filterArrays(regions, i.regions, "name", "name").map(i=>Region.ObjectId(i._id)),
      //   order: i.order,
      // }))
      var data = items.map(i => update({pokeapi_id: i.id},{
        pokedexes: filterArrays(pokedexes, i.pokedexes, "name", "name").map(k => Pokedex.ObjectId(k._id))
      }))
      // console.log(JSON.stringify(data, null, 1))
      VersionGroup.bulkWrite(data).then((err,results) => waterfallcallback(err, results))
    }
  ], (err, results) => {
    console.log(err);
    process.exit();
  })
})()
