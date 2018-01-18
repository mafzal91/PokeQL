var async = require('async')
var axios = require('axios')
var models = require('../models')

var Stat = models.stat

var IDs = (new Array(10)).fill(1).map((i,index) => index+1)

const k = (()=>{
  async.eachSeries(IDs, (ID, eachCallback) => {
    axios.get(`http://pokeapi.co/api/v2/stat/${ID}`).then(res => {
      var stat = new Stat({
        name: res.data.name,
        pokeapi_id: res.data.id,
        is_battle_only: res.data.is_battle_only
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
    // console.log(pokemonIDs)
    console.log(err)
    process.exit()
  })
})()
