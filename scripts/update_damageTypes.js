var async = require('async')
var axios = require('axios')
var models = require('../models')

var Type = models.type
var Generation = models.generation

const k = (()=>{
  async.waterfall([
    (waterfallCallback) => {
      Type.find({},Type.fields.all, (err, results) => {
        waterfallCallback(err, results)
      })
    },
    (data, waterfallCallback) => {
      var typeData = []
      async.eachSeries(data, (type, eachCallback) => {
        axios.get(`https://www.pokeapi.co/api/v2/type/${type.pokeapi_id}`).then(res => {

          typeData.push({
            updateOne: {
              filter: { _id: Type.ObjectId(type._id) },
              update: {
                damage_relations: {
                  half_damage_from: data.filter(type => {
                    return res.data.damage_relations.half_damage_from.findIndex(item => item.name === type.name) !== -1
                  }).map(type => type._id),
                  no_damage_from: data.filter(type => {
                    return res.data.damage_relations.no_damage_from.findIndex(item => item.name === type.name) !== -1
                  }).map(type => Type.ObjectId(type._id)),
                  half_damage_to: data.filter(type => {
                    return res.data.damage_relations.half_damage_to.findIndex(item => item.name === type.name) !== -1
                  }).map(type => Type.ObjectId(type._id)),
                  double_damage_from: data.filter(type => {
                    return res.data.damage_relations.double_damage_from.findIndex(item => item.name === type.name) !== -1
                  }).map(type => Type.ObjectId(type._id)),
                  no_damage_to: data.filter(type => {
                    return res.data.damage_relations.no_damage_to.findIndex(item => item.name === type.name) !== -1
                  }).map(type => Type.ObjectId(type._id)),
                  double_damage_to: data.filter(type => {
                    return res.data.damage_relations.double_damage_to.findIndex(item => item.name === type.name) !== -1
                  }).map(type => Type.ObjectId(type._id)),
                }
              }
            }
          })
          eachCallback(null)
        }).catch(err => {
          eachCallback(null)
        })
      }, (err) => {
        console.log(JSON.stringify(typeData, null, 1))
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
