var config = require("../config");
var async = require("async");
var axios = require("axios");

var utils = require("./utils");
var moment = require("moment");

var mongo = require("mongodb").MongoClient;

var url = `mongodb://${config.mongodb.hosts[0]}:${config.mongodb.port}/Pokemon`;
mongo.connect(url, (err, db) => {
  db.collection("pokemon")
    .find({})
    .toArray((err, data) => {
      console.log(data.length);
      async.eachSeries(
        data,
        (pokemon, eachCb) => {
          if (typeof pokemon.location_area_encounters === "string") {
            console.log(`requesting for ${pokemon.id} ${pokemon.name}`);
            axios(`https://pokeapi.co${pokemon.location_area_encounters}`)
              .then((res) =>
                db
                  .collection("pokemon")
                  .updateOne(
                    {_id: pokemon._id},
                    {$set: {location_area_encounters: res.data}},
                  ),
              )
              .then((res) => {
                setTimeout(() => eachCb(null), 500);
              })
              .catch(eachCb);
          } else {
            eachCb(null);
          }
        },
        (err) => {
          if (err) console.log(err);
          process.exit();
        },
      );
    });
});
