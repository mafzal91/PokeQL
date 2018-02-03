var config = require('../config')
var mongo = require('mongoose')
mongo.Promise = global.Promise;
mongo.connect(`mongodb://${config.mongodb.hosts[0]}:${config.mongodb.port}/${config.mongodb.database}`, {useMongoClient: true}).then(
  () => { console.log("Connected")},
  (err) => { console.log(err)}
)

module.exports = mongo
