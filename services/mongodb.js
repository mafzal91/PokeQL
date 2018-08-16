var config = require('../config')
var mongo = require('mongoose')
mongo.Promise = global.Promise;

var options = {
  user: config.mongodb.user,
  pass: config.mongodb.password,
  useMongoClient: true,
  auth: { authSource: "admin" }
}

mongo.set('debug', config.mongodb.debug)

mongo.connect(`mongodb://${config.mongodb.hosts[0]}:${config.mongodb.port}/${config.mongodb.database}`, options).then(
  () => { console.log("Connected")},
  (err) => { console.log(err) }
)

module.exports = mongo
