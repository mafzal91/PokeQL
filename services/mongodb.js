var config = require('../config')
var mongo = require('mongoose')
mongo.Promise = global.Promise;

var options = {
  user: config.mongodb.user,
  pass: config.mongodb.password,
  useMongoClient: true,
}

mongo.connect(`mongodb://${config.mongodb.hosts[0]}:${config.mongodb.port}/${config.mongodb.database}`, options).then(
  () => { console.log("Connected")},
  (err) => { console.log(err) }
)

module.exports = mongo
