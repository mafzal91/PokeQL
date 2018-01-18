var async = require('async')
var axios = require('axios')
var models = require('../models')

var Type = models.type;
var Ability = models.ability;
var Stat = models.stat;
var Pokemon = models.pokemon;

var pokemonIDs = (new Array(151)).fill(1).map((i,index) => index+1)


const k = (()=>{
    console.time('start')
    var pokemonList = [];
    async.waterfall([
      (waterfallCallback)=>{
        async.parallel({
          types: (parallelCallback) => { Type.find().select('name id').exec((err,results) => parallelCallback(err, results)) },
          abilities:(parallelCallback) => { Ability.find().select('name id').exec((err,results) => parallelCallback(err, results)) },
          stats:(parallelCallback) => { Stat.find().select('name id').exec((err,results) => parallelCallback(err, results)) },
        }, (err, results) => { waterfallCallback(err, results) })
      },
      ({types, abilities, stats}, waterfallCallback)=>{
        var pokemonList = [];
        async.eachSeries(pokemonIDs, (pokemonID, eachCallback) => {
          console.log("Requesting", pokemonID)
          console.time(`request`)
          axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonID}`).then(res => {
            console.timeEnd(`request`)
            pokemonList.push({
              insertOne:{
                document: {
                  name: res.data.name,
                  pokeapi_id: res.data.id,
                  color: res.data.color,
                  weight:res.data.weight,
                  stats:res.data.stats.map(item => ({
                    effort: item.effort,
                    base_stat: item.base_stat,
                    stat: Stat.ObjectId(stats.find(stat => stat.name === item.stat.name).id)
                  })),
                  abilities:res.data.abilities.map(item => ({
                    slot: item.slot,
                    is_hidden: item.is_hidden,
                    ability: Ability.ObjectId(abilities.find(ability => ability.name === item.ability.name).id)
                  })),
                  sprites:res.data.sprites,
                  order:res.data.order,
                  base_experience:res.data.base_experience,
                  types:res.data.types.map(item => ({
                    slot: item.slot,
                    type: Type.ObjectId(types.find(type => type.name === item.type.name).id)
                  })),
                  is_default:res.data.is_default,
                }
              }
            })
            eachCallback(null)
          }).catch(err => {
            console.timeEnd(`request`)
            eachCallback(err)
          })
        }, (err) => {
          waterfallCallback(err, pokemonList)
        })
      },
      (data, waterfallCallback) => {
        Pokemon.bulkWrite(data).then((err, results)=>{
          waterfallCallback(err)
        })
      }
    ], (err, result) => {
      console.timeEnd('start')
      process.exit()
    })

})()
