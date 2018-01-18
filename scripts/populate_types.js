var async = require('async')
var axios = require('axios')
var models = require('../models')

var Type = models.type
var Generation = models.generation

const k = (()=>{
  async.waterfall([
    (waterfallCallback) => {
      axios.get(`http://pokeapi.co/api/v2/type/`).then(res => {
        waterfallCallback(null,res.data)
      })
    },
    (data, waterfallCallback) => {
      var typeData = []
      async.eachSeries(data.results, (type, eachCallback) => {
        console.log("requesting", type.url)
        axios.get(`${type.url}`).then(res => {
          Generation.findOne({name: res.data.generation.name}).select('_id').exec((err, result) => {
            var new_type = {
              pokeapi_id: res.data.id,
              name:res.data.name,
              generation: result._id,
            }
            typeData.push({
              insertOne:{
                document: new_type
              }
            })
            eachCallback(err)
          })
        }).catch(err => {
          eachCallback(err)
        })
      }, (err) => {
        console.log(typeData)
        waterfallCallback(err, typeData)
      })
    },
    (data, waterfallCallback) => {
      Type.bulkWrite(data).then((err, results) => {
        console.log(results)
        waterfallCallback(err)
      })
    }
  ], (err) => {
    console.log(err)
    process.exit()
  })
})()
