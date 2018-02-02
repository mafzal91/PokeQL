var async = require('async')
var axios = require('axios')
var fs = require('fs')
var models = require('../models')
var utils = require('./utils')

var insert = utils.insert;
var update = utils.update;
var filterArray = utils.filterArray;
var filterArrays = utils.filterArrays;
var findInArray = utils.findInArray;

var Ability = models.ability
var Generation = models.generation

const k = (()=>{
  var GENERATIONS = [];
  async.waterfall([
    (waterfallCallback) => {
      axios.get(`http://pokeapi.co/api/v2/ability/`,{params:{limit: 300, offset:0}}).then(res => {
        waterfallCallback(null,res.data)
      })
    },
    (data, waterfallCallback) => {
      Generation.find({},'pokeapi_id name', (err, results)=>{
        GENERATIONS = results
        waterfallCallback(err, data)
      })
    },
    (data, waterfallCallback) => {
      var abilitiesList = []
      async.eachOfSeries(data.results, (ability, index, eachCallback) => {
        console.log(index, "Requesting",ability.name)
        axios.get(`${ability.url}`).then(res => {
          var t = update({pokeapi_id: res.data.id},{
            generation: Generation.ObjectId(GENERATIONS.find(item => item.name === res.data.generation.name).id),
          })
          // console.log(t)
          abilitiesList.push(t)
          eachCallback(null)
        }).catch(err => {
          eachCallback(err)
        })

      }, (err) => {
        // fs.writeFileSync('abilities.json', JSON.stringify(abilitiesList))
        waterfallCallback(err, abilitiesList)
      })
    },
    (data, waterfallCallback) => {
      // console.log(data)
      Ability.bulkWrite(data).then((err, results) => {
        console.log(results)
        waterfallCallback(err)
      })
    }
  ], (err) => {
    console.log(err)
    process.exit()

  })

})()

//
//
// const k = (()=>{
//   var GENERATIONS = [];
//   async.waterfall([
//     (waterfallCallback) => {
//       fs.readFile('abilities.json',(err, results) => {
//         var t = JSON.parse(results)
//         t.forEach(item => {
//           item.insertOne.document.generation = Generation.ObjectId(item.insertOne.document.generation)
//           console.log(item.insertOne.document.generation === "false")
//         })
//         waterfallCallback(null,t)
//       })
//     },
//     (data, waterfallCallback) => {
//       Ability.bulkWrite(data).then((err, results) => {
//         console.log(results)
//         waterfallCallback(null)
//       }).catch(err => {
//         console.log(err)
//         waterfallCallback(err)
//       })
//     }
//   ], (err) => {
//     console.log(err)
//     process.exit()
//   })
//
// })()
