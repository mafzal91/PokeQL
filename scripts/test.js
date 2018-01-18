var async = require('async')
var axios = require('axios')
var models = require('../models')

const k = (()=>{
  var populate = [
    {path:'main_generation', select:'name'},
  ]

  models.region.find()
  .populate(populate)
  .exec((err, results) => {
    console.log(err)
    console.log(JSON.stringify(results, null, 1))
  })
})()
