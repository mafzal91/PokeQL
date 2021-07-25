var config = require("../config");
var async = require("async");
var axios = require("axios");
var fs = require("fs");
var utils = require("./utils");
var moment = require("moment");
// var models = require('../models')
var mongo = require("mongodb").MongoClient;
// var Version = models.version
// console.log(mongo)
var url = `mongodb://${config.mongodb.hosts[0]}:${config.mongodb.port}/Pokemon`;
mongo.connect(url, (err, db) => {
  const k = (() => {
    var routes = {
      ["berry"]: `http://pokeapi.co/api/v2/berry/?limit=5000`,
      ["berry-firmness"]: `http://pokeapi.co/api/v2/berry-firmness/?limit=5000`,
      ["berry-flavor"]: `http://pokeapi.co/api/v2/berry-flavor/?limit=5000`,
      ["contest-type"]: `http://pokeapi.co/api/v2/contest-type/?limit=5000`,
      ["contest-effect"]: `http://pokeapi.co/api/v2/contest-effect/?limit=5000`,
      ["super-contest-effect"]: `http://pokeapi.co/api/v2/super-contest-effect/?limit=5000`,
      ["encounter-method"]: `http://pokeapi.co/api/v2/encounter-method/?limit=5000`,
      ["encounter-condition"]: `http://pokeapi.co/api/v2/encounter-condition/?limit=5000`,
      ["encounter-condition-value"]: `http://pokeapi.co/api/v2/encounter-condition-value/?limit=5000`,
      ["evolution-chain"]: `http://pokeapi.co/api/v2/evolution-chain/?limit=5000`,
      ["evolution-trigger"]: `http://pokeapi.co/api/v2/evolution-trigger/?limit=5000`,
      ["generation"]: `http://pokeapi.co/api/v2/generation/?limit=5000`,
      ["pokedex"]: `http://pokeapi.co/api/v2/pokedex/?limit=5000`,
      ["version"]: `http://pokeapi.co/api/v2/version/?limit=5000`,
      ["version-group"]: `http://pokeapi.co/api/v2/version-group/?limit=5000`,
      ["item"]: `http://pokeapi.co/api/v2/item/?limit=5000`,
      ["item-attribute"]: `http://pokeapi.co/api/v2/item-attribute/?limit=5000`,
      ["item-category"]: `http://pokeapi.co/api/v2/item-category/?limit=5000`,
      ["item-fling-effect"]: `http://pokeapi.co/api/v2/item-fling-effect/?limit=5000`,
      ["item-pocket"]: `http://pokeapi.co/api/v2/item-pocket/?limit=5000`,
      ["machine"]: `http://pokeapi.co/api/v2/machine/?limit=5000`,
      ["move"]: `http://pokeapi.co/api/v2/move/?limit=5000`,
      ["move-ailment"]: `http://pokeapi.co/api/v2/move-ailment/?limit=5000`,
      ["move-battle-style"]: `http://pokeapi.co/api/v2/move-battle-style/?limit=5000`,
      ["move-category"]: `http://pokeapi.co/api/v2/move-category/?limit=5000`,
      ["move-damage-class"]: `http://pokeapi.co/api/v2/move-damage-class/?limit=5000`,
      ["move-learn-method"]: `http://pokeapi.co/api/v2/move-learn-method/?limit=5000`,
      ["move-target"]: `http://pokeapi.co/api/v2/move-target/?limit=5000`,
      ["location"]: `http://pokeapi.co/api/v2/location/?limit=5000`,
      ["location-area"]: `http://pokeapi.co/api/v2/location-area/?limit=5000`,
      ["pal-park-area"]: `http://pokeapi.co/api/v2/pal-park-area/?limit=5000`,
      ["region"]: `http://pokeapi.co/api/v2/region/?limit=5000`,
      ["ability"]: `http://pokeapi.co/api/v2/ability/?limit=5000`,
      ["characteristic"]: `http://pokeapi.co/api/v2/characteristic/?limit=5000`,
      ["egg-group"]: `http://pokeapi.co/api/v2/egg-group/?limit=5000`,
      ["gender"]: `http://pokeapi.co/api/v2/gender/?limit=5000`,
      ["growth-rate"]: `http://pokeapi.co/api/v2/growth-rate/?limit=5000`,
      ["nature"]: `http://pokeapi.co/api/v2/nature/?limit=5000`,
      ["pokeathlon-stat"]: `http://pokeapi.co/api/v2/pokeathlon-stat/?limit=5000`,
      ["pokemon"]: `http://pokeapi.co/api/v2/pokemon/?limit=5000`,
      ["pokemon-color"]: `http://pokeapi.co/api/v2/pokemon-color/?limit=5000`,
      ["pokemon-form"]: `http://pokeapi.co/api/v2/pokemon-form/?limit=5000`,
      ["pokemon-habitat"]: `http://pokeapi.co/api/v2/pokemon-habitat/?limit=5000`,
      ["pokemon-shape"]: `http://pokeapi.co/api/v2/pokemon-shape/?limit=5000`,
      ["pokemon-species"]: `http://pokeapi.co/api/v2/pokemon-species/?limit=5000`,
      ["stat"]: `http://pokeapi.co/api/v2/stat/?limit=5000`,
      ["type"]: `http://pokeapi.co/api/v2/type/?limit=5000`,
      ["language"]: `http://pokeapi.co/api/v2/language/?limit=5000`,
    };

    async.waterfall(
      [
        (waterfallCallback) => {
          var funcs = Object.keys(routes).map((key) => {
            //Go through all keys in routes

            return (next) => {
              //return function that async.series will run
              axios
                .get(routes[key])
                .then((res) => {
                  //Fetch route

                  async.eachSeries(
                    res.data.results,
                    (item, eachCb) => {
                      //for every url in the results
                      let id = item.url.split("/")[6]; //get the resource id (param on url)

                      db.collection(key).findOne(
                        {id: parseInt(id, 10)},
                        (err, res) => {
                          //See if it exists on db
                          // console.log(`db.collection(${key}).findOne({id: ${id}})`)
                          if (!res) {
                            async.retry(
                              {times: 5, interval: 5000},
                              (retryCallback) => {
                                //Fetch Resource if it doesnt and insert into db
                                console.log(moment().format("lll"), item.url);

                                axios
                                  .get(`${item.url}`)
                                  .then((res) => {
                                    db.collection(key).insert(
                                      res.data,
                                      (err, result) => {
                                        if (err) throw err;
                                        console.log(
                                          `Inserted ${key} ${id} ${item.name}`,
                                        );
                                        setTimeout(
                                          () => retryCallback(err, res),
                                          5000,
                                        );
                                      },
                                    );
                                  })
                                  .catch(retryCallback);
                              },
                              eachCb,
                            );
                          } else {
                            console.log(`Exists ${key} ${id} ${item.name}`);
                            eachCb(err);
                          }
                        },
                      );
                    },
                    next,
                  );
                })
                .catch((err) => {
                  console.log(err);
                  next(err);
                });
            };
          });
          // console.log(funcs)
          async.series(funcs, (err, results) => {
            waterfallCallback(err, results);
          });
        },
      ],
      (err, data) => {
        db.close();
        process.exit();
      },
    );
  })();
});
