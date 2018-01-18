var fs = require('fs')

var async = require('async')
var axios = require('axios')
var models = require('../models')

var ItemCategory = models.itemCategory;
var ItemPocket = models.itemPocket;

const k = (()=>{
  var pokemonList = [];
  async.waterfall([
    (waterfallCallback)=>{
      var pockets = JSON.parse(fs.readFileSync("pockets.json"));
      var categories = JSON.parse(fs.readFileSync("categories.json"));
      waterfallCallback(null, {pockets, categories})
    },
    ({pockets, categories}, waterfallCallback)=>{
      var category = categories.map(category => {
        return {
          insertOne:{
            document: {
              pokeapi_id: category.id,
              name: category.name,
            }
          }
        }
      })
      ItemCategory.bulkWrite(category,{},(err, results)=>{
        waterfallCallback(err, pockets)
      })
    },
    (pockets, waterfallCallback) => ItemCategory.find({}, 'name', (err,results) => waterfallCallback(err,pockets,results)),
    (pockets, categories, waterfallCallback) => {
      var pockets = pockets.map(pocket => {
        return {
          insertOne:{
            document: {
              pokeapi_id: pocket.id,
              name: pocket.name,
              categories: categories.filter(category => pocket.categories.findIndex(cat => cat.name === category.name)!==-1)
                .map(category => ItemCategory.ObjectId(category.id)),
            }
          }
        }
      })
      ItemPocket.bulkWrite(pockets, {}, (err, results) => waterfallCallback(err))
    }
  ], (err, result) => {
    console.log(err)
    process.exit()
  })

})()
