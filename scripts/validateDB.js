var config = require("../config");
var async = require("async");
var models = require("../models");
var mongo = require("mongodb").MongoClient;

var url = `mongodb://${config.mongodb.hosts[0]}:${config.mongodb.port}/Pokemon`;
mongo.connect(url, (err, db) => {
  var routes = [
    {berry: "berry"},
    {"berry-firmness": "berryFirmness"},
    {"berry-flavor": "berryFlavor"},
    {"contest-type": "contestType"},
    {"contest-effect": "contestEffect"},
    {"super-contest-effect": "superContestEffect"},
    {"encounter-method": "encounterMethod"},
    {"encounter-condition": "encounterCondition"},
    {"encounter-condition-value": "encounterConditionValue"},
    {"evolution-chain": "evolutionChain"},
    {"evolution-trigger": "evolutionTrigger"},
    {generation: "generation"},
    {pokedex: "pokedex"},
    {version: "version"},
    {"version-group": "versionGroup"},
    {item: "item"},
    {"item-attribute": "itemAttribute"},
    {"item-category": "itemCategory"},
    {"item-fling-effect": "itemFlingEffect"},
    {"item-pocket": "itemPocket"},
    {machine: "machine"},
    {move: "move"},
    {"move-ailment": "moveAilment"},
    {"move-battle-style": "moveBattleStyle"},
    {"move-category": "moveCategory"},
    {"move-damage-class": "moveDamageClass"},
    {"move-learn-method": "moveLearnMethod"},
    {"move-target": "moveTarget"},
    {location: "location"},
    {"location-area": "locationArea"},
    {"pal-park-area": "palParkArea"},
    {region: "region"},
    {ability: "ability"},
    {characteristic: "characteristic"},
    {"egg-group": "eggGroup"},
    {gender: "gender"},
    {"growth-rate": "growthRate"},
    {nature: "nature"},
    {"pokeathlon-stat": "pokeathlonStat"},
    {pokemon: "pokemon"},
    {"pokemon-color": "pokemonColor"},
    {"pokemon-form": "pokemonForm"},
    {"pokemon-habitat": "pokemonHabitat"},
    {"pokemon-shape": "pokemonShape"},
    {"pokemon-species": "pokemonSpecies"},
    {stat: "stat"},
    {type: "type"},
    {language: "language"},
  ];

  async.each(
    routes,
    (route, next) => {
      let pokeapi = Object.keys(route)[0];
      let pokeql = route[pokeapi];
      async.parallel(
        {
          pokeapi: (parallelCallback) =>
            db.collection(pokeapi).find({}).toArray(parallelCallback),
          pokeql: (parallelCallback) =>
            models[pokeql].find({}).exec(parallelCallback),
        },
        (err, res) => {
          if (res.pokeapi.length !== res.pokeql.length)
            console.log(
              "Not Equal",
              `pokeapi ${pokeapi}: ${res.pokeapi.length}`,
              `pokeql ${pokeql}: ${res.pokeql.length}`,
            );
          next(err);
        },
      );
    },
    (err) => {
      console.log("complete");
      process.exit();
    },
  );
});
