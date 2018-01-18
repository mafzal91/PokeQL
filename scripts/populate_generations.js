var async = require('async')
var axios = require('axios')
var models = require('../models')

var Generation = models.generation


const k = (()=>{

  async.waterfall([
    (waterfallCallback) => {
      axios.get(`http://pokeapi.co/api/v2/generation/`).then(res => {
        waterfallCallback(null,res.data)
      })
    },
    (data, waterfallCallback) => {
      async.eachSeries(data.results, (generation, eachCallback) => {
        console.log(generation.url)
        axios.get(`${generation.url}`).then(res => {
          console.log(res.data)
          var gen = new Generation({
            pokeapi_id: res.data.id,
            name:res.data.name,
          }).save((err, result) => {
            if(!err){
              eachCallback(null)
            } else {
              eachCallback(err)
            }
          })
        }).catch(err => {
          eachCallback(err)
        })

      }, (err) => {
        waterfallCallback(err)
      })
    },
  ], (err) => {
    console.log(err)
    process.exit()

  })

})()
