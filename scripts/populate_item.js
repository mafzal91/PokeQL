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

var Item = models.item;
var ItemAttribute = models.itemAttribute;
var ItemCategory = models.itemCategory;
var ItemFlingEffect = models.itemFlingEffect;
var VersionGroup = models.versionGroup
var Generation = models.generation

const k = (()=>{
    async.waterfall([
      (waterfallCallback)=>{
        async.parallel({
          items: (parallelCallback) => axios.get('https://pokeapi.co/api/v2/item?limit=1000').then(res => parallelCallback(null, res.data.results)),
          attributes: (parallelCallback) => { ItemAttribute.find().exec((err,results) => parallelCallback(err, results)) },
          categories:(parallelCallback) => { ItemCategory.find().exec((err,results) => parallelCallback(err, results)) },
          flingEffect:(parallelCallback) => { ItemFlingEffect.find().exec((err,results) => parallelCallback(err, results)) },
          versionGroup:(parallelCallback) => { VersionGroup.find().exec((err,results) => parallelCallback(err, results)) },
          generation:(parallelCallback) => { Generation.find().exec((err,results) => parallelCallback(err, results)) },
        }, (err, results) => waterfallCallback(err, results))
      },
      ({items, attributes, categories, flingEffect, versionGroup, generation}, waterfallCallback)=>{
        var data = [];
        async.eachSeries(items, (item, eachCallback) => {
          console.log("Requesting", item.url)
          axios.get(item.url).then(res => {
            data.push(insert({
              name: res.data.name,
              pokeapi_id: res.data.id,
              category: ItemCategory.ObjectId(findInArray(categories, "name", res.data.category.name)._id),
              fling_effect: res.data.fling_effect ? ItemFlingEffect.ObjectId(findInArray(flingEffect, "name", res.data.fling_effect.name)._id):null,
              effect_entries: res.data.effect_entries.filter(i=>i.language.name==="en").map(i=>({short_effect:i.short_effect,effect:i.effect})),
              sprite: res.data.sprites,
              game_indices: res.data.game_indices.map(i=>({
                game_index:i.game_index,
                generation: Generation.ObjectId(findInArray(generation, "name", i.generation.name)._id),
              })),
              baby_trigger_for:res.data.baby_trigger_for ? res.data.baby_trigger_for.url:null,
              cost: res.data.cost,
              attributes: filterArrays(attributes,res.data.attributes,"name","name").map(i=>ItemAttribute.ObjectId(i._id)),
              flavor_text_entries: res.data.flavor_text_entries.filter(i=>i.language.name==="en")
              .map(i=>({
                text: i.text,
                version_group: VersionGroup.ObjectId(findInArray(versionGroup, "name",i.version_group.name)._id),
              })),
              machines: res.data.machines.map(i=>i.url),
              fling_power: res.data.fling_power,
            }))
            // console.log(JSON.stringify(data)
            setTimeout(()=>eachCallback(null),500)
          }).catch(err => {
            console.log(err)
            eachCallback(err)
          })
        }, err => {
          console.log(err)
          waterfallCallback(err,data)
        })
      },
      (data, waterfallCallback) => {
        Item.bulkWrite(data).then((err, results)=>{
          waterfallCallback(err)
        }).catch(err=>console.log(err))
      }
    ], (err, result) => {
      console.timeEnd('start')
      process.exit()
    })

})()
