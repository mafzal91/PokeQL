var async = require('async');
var axios = require('axios');
var fs = require('fs');
var utils = require('./utils')

var models = require('../models')

var Version = models.version

const reqFunc = (item, eachCallback) => {
  console.log(item.url)
  axios.get(`${item.url}`).then(res => {
    listJSON.push(res.data)
    setTimeout(() => eachCallback(null), 1000)
  }).catch(err => {
    eachCallback(err)
  })
}

const k = (()=>{

  async.waterfall([
    (waterfallCallback) => {
      async.parallel({
        version: (parallelCallback) => axios.get(`http://pokeapi.co/api/v2/version/?limit=1000`).then(res => parallelCallback(null,res.data)),
        versionGroup: (parallelCallback) => axios.get(`http://pokeapi.co/api/v2/version-group/?limit=1000`).then(res => parallelCallback(null,res.data)),
        region: (parallelCallback) => axios.get(`http://pokeapi.co/api/v2/region/?limit=1000`).then(res => parallelCallback(null,res.data)),
        pokedex: (parallelCallback) => axios.get(`http://pokeapi.co/api/v2/pokedex/?limit=1000`).then(res => parallelCallback(null,res.data)),
      }, (err,results) => {
        waterfallCallback(err, results)
      })
    },
    ({version, versionGroup, region, pokedex}, waterfallCallback) => {

      async.parallel({
        version: (parallelCallback) => {
          var listJSON = []
          async.eachSeries(version.results, (item, eachCallback) => {
            console.log(item.url)
            axios.get(`${item.url}`).then(res => {
              listJSON.push(res.data)
              setTimeout(() => eachCallback(null), 1000)
            }).catch(err => {
              eachCallback(err)
            })
          }, (err, results) => {
            fs.writeFileSync("version",JSON.stringify(listJSON));
            parallelCallback(err)
          })
        },
        versionGroup: (parallelCallback) => {
          var listJSON = []
          async.eachSeries(versionGroup.results, (item, eachCallback) => {
            console.log(item.url)
            axios.get(`${item.url}`).then(res => {
              listJSON.push(res.data)
              setTimeout(() => eachCallback(null), 1000)
            }).catch(err => {
              eachCallback(err)
            })
          }, (err, results) => {
            fs.writeFileSync("versionGroup",JSON.stringify(listJSON));
            parallelCallback(err)
          })
        },
        region: (parallelCallback) => {
          var listJSON = []
          async.eachSeries(region.results, (item, eachCallback) => {
            console.log(item.url)
            axios.get(`${item.url}`).then(res => {
              listJSON.push(res.data)
              setTimeout(() => eachCallback(null), 1000)
            }).catch(err => {
              eachCallback(err)
            })
          }, (err, results) => {
            fs.writeFileSync("region",JSON.stringify(listJSON));
            parallelCallback(err)
          })
        },
        pokedex: (parallelCallback) => {
          var listJSON = []
          async.eachSeries(pokedex.results, (item, eachCallback) => {
            console.log(item.url)
            axios.get(`${item.url}`).then(res => {
              listJSON.push(res.data)
              setTimeout(() => eachCallback(null), 1000)
            }).catch(err => {
              eachCallback(err)
            })
          }, (err, results) => {
            fs.writeFileSync("pokedex",JSON.stringify(listJSON));
            parallelCallback(err)
          })
        },
      }, (err, results) =>{
        waterfallCallback(err)
      })
    },
  ], (err) => {
    console.log(err)
    process.exit()
  })

})()
