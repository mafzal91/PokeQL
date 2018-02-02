var async = require('async')
var axios = require('axios')
var models = require('../models')

const k = (()=>{
  var populate = [
    {path:'damage_relations.no_damage_to', select:'name generation'},
  ]
  models.type.findOne()
  .populate(populate)
  .exec((err, results) => {
    console.log(err)
    console.log(JSON.stringify(results, null, 1))
  })
})()
