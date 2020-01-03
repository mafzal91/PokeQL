var config = require('../config')
var mongo = require('mongoose')
mongo.Promise = global.Promise;

const options = (config.mongodb.user && config.mongodb.password ) ? {
  user: config.mongodb.user,
  pass: config.mongodb.password,
  auth: { authSource: "admin" },
  useNewUrlParser: true,
  useUnifiedTopology: true
}: {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
console.log(options)
mongo.set('debug', config.mongodb.debug)

mongo.connect(`mongodb://${config.mongodb.hosts[0]}:${config.mongodb.port}/${config.mongodb.database}`, options).then(
  () => { console.log("Connected")},
  (err) => { console.log(err) }
)

module.exports = mongo
