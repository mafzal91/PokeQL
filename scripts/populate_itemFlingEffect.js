var async = require('async')
var axios = require('axios')
var models = require('../models')

var ItemFlingEffect = models.itemFlingEffect


const k = (()=>{

  async.waterfall([
    (waterfallCallback) => {
      axios.get(`http://pokeapi.co/api/v2/item-fling-effect/`).then(res => {
        waterfallCallback(null,res.data)
      })
    },
    (data, waterfallCallback) => {
      var list = []
      async.eachSeries(data.results, (item, eachCallback) => {
        console.log(item.url)
        axios.get(`${item.url}`).then(res => {
          list.push({
            insertOne:{
              document:{
                pokeapi_id: res.data.id,
                name:res.data.name,
                effect_entries:res.data.effect_entries.filter(item => item.language.name === "en").map(item => ({effect:item.effect})),
              }
            }
          })
          eachCallback(null)
        }).catch(err => {
          eachCallback(err)
        })
      }, (err) => {
        waterfallCallback(err,list)
      })
    },
    (data, waterfallCallback) => {
      ItemFlingEffect.bulkWrite(data).then((err, result) => waterfallCallback(result)).catch(waterfallCallback)
    }
  ], (err) => {
    console.log(err)
    process.exit()

  })

})()
