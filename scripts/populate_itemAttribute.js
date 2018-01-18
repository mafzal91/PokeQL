var async = require('async')
var axios = require('axios')
var models = require('../models')

var utils = require('./utils')

var models = require('../models')

var insert = utils.insert;
var update = utils.update;
var filterArray = utils.filterArray;
var filterArrays = utils.filterArrays;
var findInArray = utils.findInArray;
var ItemAttribute = models.itemAttribute


const k = (()=>{

  async.waterfall([
    (waterfallCallback) => {
      axios.get(`http://pokeapi.co/api/v2/item-attribute/`).then(res => {
        waterfallCallback(null,res.data)
      })
    },
    (data, waterfallCallback) => {
      var list = []
      async.eachSeries(data.results, (item, eachCallback) => {
        console.log(item.url)
        axios.get(`${item.url}`).then(res => {
          list.push(update({
              name: res.data.name,
            },
            {
              description: res.data.descriptions.find(i=>i.language.name === 'en').description,
            }
          ))
          eachCallback(null)
        }).catch(err => {
          eachCallback(err)
        })
      }, (err) => {
        waterfallCallback(err,list)
      })
    },
    (data, waterfallCallback) => {
      ItemAttribute.bulkWrite(data).then(result => waterfallCallback(result)).catch(waterfallCallback)
    }
  ], (err) => {
    console.log(err)
    process.exit()

  })

})()
