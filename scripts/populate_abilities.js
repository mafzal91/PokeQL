var async = require('async')
var axios = require('axios')
var fs = require('fs')
var models = require('../models')

var Ability = models.ability
var Generation = models.generation

// const k = (()=>{
//   var GENERATIONS = [];
//   async.waterfall([
//     (waterfallCallback) => {
//       axios.get(`http://pokeapi.co/api/v2/ability/`,{params:{limit: 300, offset:0}}).then(res => {
//         waterfallCallback(null,res.data)
//       })
//     },
//     (data, waterfallCallback) => {
//       Generation.find({},'pokeapi_id name', (err, results)=>{
//         GENERATIONS = results
//         waterfallCallback(err, data)
//       })
//     },
//     (data, waterfallCallback) => {
//       var abilitiesList = []
//       async.eachOfSeries(data.results, (ability, index, eachCallback) => {
//         console.log(index, "Requesting",ability.name)
//         axios.get(`${ability.url}`).then(res => {
//           abilitiesList.push({
//             insertOne: {
//               document: {
//                 pokeapi_id: res.data.id,
//                 name: res.data.name,
//                 generation: Generation.ObjectId(GENERATIONS.find(item => item.name === res.data.generation.name).id),
//                 is_main_series: res.data.is_main_series,
//                 effect_entries: res.data.effect_entries.filter(item => item.language.name === "en").map(item => ({short_effect: item.short_effect, effect: item.effect, language: item.language.name})),
//                 effect_changes: res.data.effect_changes.map(item => ({
//                   effect_entries: item.effect_entries.filter(item2 => item2.language.name === "en").map(item2 => ({effect: item2.effect, language: item2.language.name})),
//                   version_group: item.version_group.name
//                 })),
//                 flavor_texts: res.data.flavor_text_entries.filter(item => item.language.name === "en").map(item => ({flavor_text: item.flavor_text, language: item.language.name, version_group: item.version_group.name})),
//               }
//             }
//           })
//           eachCallback(null)
//         }).catch(err => {
//           eachCallback(err)
//         })
//
//       }, (err) => {
//         fs.writeFileSync('abilities.json', JSON.stringify(abilitiesList))
//         waterfallCallback(err, abilitiesList)
//       })
//     },
//     (data, waterfallCallback) => {
//       Ability.bulkWrite(data).then((err, results) => {
//         console.log(results)
//         waterfallCallback(err)
//       })
//     }
//   ], (err) => {
//     console.log(err)
//     process.exit()
//
//   })
//
// })()
//


const k = (()=>{
  var GENERATIONS = [];
  async.waterfall([
    (waterfallCallback) => {
      fs.readFile('abilities.json',(err, results) => {
        var t = JSON.parse(results)
        t.forEach(item => {
          item.insertOne.document.generation = Generation.ObjectId(item.insertOne.document.generation)
          console.log(item.insertOne.document.generation === "false")
        })
        waterfallCallback(null,t)
      })
    },
    (data, waterfallCallback) => {
      Ability.bulkWrite(data).then((err, results) => {
        console.log(results)
        waterfallCallback(null)
      }).catch(err => {
        console.log(err)
        waterfallCallback(err)
      })
    }
  ], (err) => {
    console.log(err)
    process.exit()
  })

})()
