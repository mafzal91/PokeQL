var config = require('../config')
var async = require('async');
var axios = require('axios');
var fs = require('fs');
var utils = require('./utils')
var moment = require('moment')
var models = require('../models')
var mongo = require('mongodb').MongoClient


var url = `mongodb://${config.mongodb.hosts[0]}:${config.mongodb.port}/Pokemon`
mongo.connect(url, (err, db) => {

    var routes = [
      "berry",
      "berry-firmness",
      "berry-flavor",
      "contest-type",
      "contest-effect",
      "super-contest-effect",
      "encounter-method",
      "encounter-condition",
      "encounter-condition-value",
      "evolution-chain",
      "evolution-trigger",
      "generation",
      "pokedex",
      "version",
      "version-group",
      "item",
      "item-attribute",
      "item-category",
      "item-fling-effect",
      "item-pocket",
      "machine",
      "move",
      "move-ailment",
      "move-battle-style",
      "move-category",
      "move-damage-class",
      "move-learn-method",
      "move-target",
      "location",
      "location-area",
      "pal-park-area",
      "region",
      "ability",
      "characteristic",
      "egg-group",
      "gender",
      "growth-rate",
      "nature",
      "pokeathlon-stat",
      "pokemon",
      "pokemon-color",
      "pokemon-form",
      "pokemon-habitat",
      "pokemon-shape",
      "pokemon-species",
      "stat",
      "type",
      "language",
    ]

    var populateType = {
      "berry": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "berry-firmness": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "berry-flavor": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "contest-type": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "contest-effect": (item, cb) => {
        try {
          var insert = {
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "super-contest-effect": (item, cb) => {
        try {
          var insert = {
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "encounter-method": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "encounter-condition": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "encounter-condition-value": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "evolution-chain": (item, cb) => {
        try {
          var insert = {
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "evolution-trigger": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "generation": (item, cb) => { //update VersionGroup
        var findNames = item.names.map(i => ({name: i.language.name}))
        var findPokemonSpecies = item.pokemon_species.map(i => ({name: i.name}))

        async.parallel({
          names: (next) => findMany(models.language, findNames, next),
          pokemonSpecies: (next) => findMany(models.pokemonSpecies, findPokemonSpecies, next)
        }, (err, results) => {
          if(err) console.log(err)
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
            names: item.names.map(i => ({
              language: results.names.find(l => i.language.name === l.name)._id,
              name: i.name
            })),
            pokemon_species: results.pokemonSpecies.map(i => i._id),
          }
          cb(err, insert)
        })
      },
      "pokedex": (item, cb) => { //update VersionGroup
        var findNames = item.names.map(i => ({name: i.language.name}))
        var findVersionGroups = item.version_groups.map(i => ({name: i.name}))
        var findDescriptions = item.descriptions.map(i => ({name: i.language.name}))
        var findPokemonEntries = item.pokemon_entries.map(i => ({name: i.pokemon_species.name}))
        console.log(findPokemonEntries)
        async.parallel({
          names: (next) => findMany(models.language, findNames, next),
          descriptions: (next) => findMany(models.language, findDescriptions, next),
          versionGroups: (next) => findMany(models.versionGroup, findVersionGroups, next),
          pokemonEntries: (next) => findMany(models.pokemonSpecies, findPokemonEntries, next),
        }, (err, results) => {
          if(err) console.log(err)
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
            is_main_series: item.is_main_series,
            descriptions: item.descriptions.map(i => ({
              language: results.descriptions.find(l => i.language.name === l.name)._id,
              description: i.description,
            })),
            names: item.names.map(i => ({
              language: results.names.find(l => i.language.name === l.name)._id,
              name: i.name
            })),
            version_group: results.versionGroups.map(i=> i._id),
            pokemon_entries: item.pokemon_entries.map((i) => {
              console.log()
              return {
                pokemon_species: results.pokemonEntries.find(l => {
                  console.log(l)
                  return i.pokemon_species.name === l.name
                })._id,
                entry_number: i.entry_number,
              }
            }),
          }
          // console.log(insert)
          cb(err, insert)
        })
      },
      "version": (item, cb) => { //update VersionGroup
        var findNames = item.names.map(i => ({name: i.language.name}))
        var findVersionGroup = {name: item.version_group.name}

        async.parallel({
          names: (next) => findMany(models.language, findNames, next)
          // versionGroup: (next) => findOne(models.versionGroup, findVersionGroup, next)
        }, (err, results) => {
          if(err) console.log(err)

          // console.log(item.id, results)
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
            names: item.names.map(i => ({
              language: results.names.find(l => i.language.name === l.name)._id,
              name: i.name
            })),
            // version_group: results.versionGroup.id
          }
          // console.log(insert)
          cb(err, insert)
        })
      },
      "version-group": (item, cb) => { //update VersionGroup
        var findGeneration = {name: item.generation.name}
        var findVersions = item.versions.map(i => ({name: i.name}))

        async.parallel({
          generation: (next) => findOne(models.generation, findGeneration, next),
          versions: (next) => findMany(models.version, findVersions, next)
        }, (err, results) => {
          if(err) console.log(err)
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
            order: item.order,
            generation: results.generation._id,
            versions: results.versions.map(i => i._id),
          }
          cb(err, insert)
        })
      },
      "item": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "item-attribute": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "item-category": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "item-fling-effect": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "item-pocket": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "machine": (item, cb) => {
        try {
          var insert = {
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "move": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "move-ailment": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "move-battle-style": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "move-category": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "move-damage-class": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "move-learn-method": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "move-target": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "location": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "location-area": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "pal-park-area": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "region": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "ability": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "characteristic": (item, cb) => {
        var findDescriptions = item.descriptions.map(i => ({name: i.language.name}))

        async.parallel({
          descriptions: (next) => findMany(models.language, findDescriptions, next)
        }, (err, results) => {
          if(err) console.log(err)

          // console.log(item.id, results)
          var insert = {
            pokeapi_id: item.id,
            gene_modulo: item.gene_modulo,
            possible_values: item.possible_values,
            descriptions: item.descriptions.map(i => {
              return {
                language: results.descriptions.find(l => i.language.name === l.name)._id,
                description: i.description
              }
            }),
          }
          cb(err, insert)
        })
      },
      "egg-group": (item, cb) => { //Update pokemonspecies
        var findLanguage = item.names.map(i => ({name: i.language.name}))

        async.parallel({
          language: (next) => findMany(models.language, findLanguage, next)
        }, (err, results) => {
          if(err) console.log(err)

          // console.log(item.id, results)
          var insert = {
            pokeapi_id: item.id,
            name: item.name,
            names: item.names.map(i => {
              return {
                language: results.language.find(l => i.language.name === l.name)._id,
                name: i.name
              }
            }),
          }
          cb(err, insert)
        })
      },
      "gender": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "growth-rate": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "nature": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "pokeathlon-stat": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "pokemon": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "pokemon-color": (item, cb) => { //update pokemonspecies
        var findLanguage = item.names.map(i => ({name: i.language.name}))

        async.parallel({
          language: (next) => findMany(models.language, findLanguage, next)
        }, (err, results) => {
          if(err) console.log(err)

          // console.log(item.id, results)
          var insert = {
            pokeapi_id: item.id,
            name: item.name,
            names: item.names.map(i => {
              return {
                language: results.language.find(l => i.language.name === l.name)._id,
                name: i.name
              }
            }),
          }
          cb(err, insert)
        })
      },
      "pokemon-form": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          console.log(e)
          cb(e)
        }
      },
      "pokemon-habitat": (item, cb) => {
        var findLanguage = item.names.map(i => ({name: i.language.name}))

        async.parallel({
          language: (next) => findMany(models.language, findLanguage, next)
        }, (err, results) => {
          if(err) console.log(err)

          // console.log(item.id, results)
          var insert = {
            pokeapi_id: item.id,
            name: item.name,
            names: item.names.map(i => {
              return {
                language: results.language.find(l => i.language.name === l.name)._id,
                name: i.name
              }
            }),
          }
          cb(err, insert)
        })
      },
      "pokemon-shape": (item, cb) => {
        var findLanguage = item.names.map(i => ({name: i.language.name}))
        var findAwesomeName = item.awesome_names.map(i => ({name: i.language.name}))

        async.parallel({
          language: (next) => findMany(models.language, findLanguage, next),
          awesomeName: (next) => findMany(models.language, findAwesomeName, next),
        }, (err, results) => {
          if(err) console.log(err)

          var insert = {
            pokeapi_id: item.id,
            name: item.name,
            names: item.names.map(i => ({
              language: results.language.find(l => i.language.name === l.name)._id,
              name: i.name
            })),
            awesome_names: item.awesome_names.map(i => ({
              language: results.awesomeName.find(l => i.language.name === l.name)._id,
              awesome_name: i.awesome_name
            }))
          }
          cb(err, insert)
        })
      },
      "pokemon-species": (item, cb) => {
        var findNames = item.names.map(i => ({name: i.language.name}))
        var findEggGroups = item.egg_groups.map(i => ({name: i.name}))
        var findGenus = item.genera.map(i => ({name: i.language.name}))
        var findColor = {name: item.color.name}
        var findHabitat = {name:  item.habitat ? item.habitat.name:""}
        var findDescriptions = item.form_descriptions.map(i => ({name: i.language.name}))
        var findShape = {name: item.shape.name}

        var requests = {
          names: (next) => findMany(models.language, findNames, next),
          eggGroups: (next) => findMany(models.eggGroup, findEggGroups, next),
          genus: (next) => findMany(models.language, findGenus, next),
          color: (next) => findOne(models.pokemonColor, findColor, next),
          habitat: (next) => findOne(models.pokemonHabitat, findHabitat, next),
          formDescriptions: (next) => findMany(models.language, findDescriptions, next),
          shape: (next) => findOne(models.pokemonShape, findShape, next),
        }

        async.parallel(requests, (err, results) => {
          if(err) console.log(err)

          var insert = {
            pokeapi_id: item.id,
            name: item.name,
            order: item.order,
            gender_rate: item.gender_rate,
            capture_rate: item.capture_rate,
            base_happiness: item.base_happiness,
            is_baby: item.is_baby,
            hatch_counter: item.hatch_counter,
            has_gender_differences: item.has_gender_differences,
            forms_switchable: item.forms_switchable,
            // growth_rate:
            // pokedex_numbers:
            egg_groups: results.eggGroups.map(i => i._id),
            color: results.color._id,
            shape: results.shape._id,
            // evolves_from_species:
            // evolution_chain:
            habitat: results.habitat ? results.habitat._id:undefined,
            // generation:
            // pal_park_encounters:
            // flavor_text_entries:
            form_descriptions:item.form_descriptions.map(i => ({
              language: results.formDescriptions.find(l => i.language.name === l.name)._id,
              description: i.description
            })),
            genera: item.genera.map(i => ({
              language: results.genus.find(l => i.language.name === l.name)._id,
              genus: i.genus
            })),
            // varieties:
            names: item.names.map(i => ({
              language: results.names.find(l => i.language.name === l.name)._id,
              name: i.name
            })),
          }
          cb(err, insert)
        })
      },
      "stat": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "type": (item, cb) => {
        try {
          var insert = {
            name: item.name,
            pokeapi_id: item.id,
          }
          cb(null, insert)
        } catch (e) {
          cb(e)
        }
      },
      "language": (item, cb) => {
        var findNames = item.names.map(i => ({name: i.name}))

        async.parallel({
          names: (next) => findMany(models.language, findNames, next)
          // names: (next) => next(null)
        }, (err, results) => {
          // console.log(results)
          var insert = {
            pokeapi_id: item.id,
            name: item.name,
            official: item.official,
            iso639: item.iso639,
            iso3166: item.iso3166,
          }
          cb(err, insert)
        })
      },
    }

    const findOne = (model, toFind, callback) => {
      return model.findOne(toFind, (err, result) =>{
        callback(err,result)
      })
    }

    const findMany = (model, toFindArray, callback) => {
      var findFuncs = toFindArray.map(i => {
        return (next) => findOne(model, i, next)
      })

      async.parallel(findFuncs, callback)
    }

    async.series([
      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('language').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.map(items, populateType['language'], waterfallCallback),
      //     (items, waterfallCallback) => models["language"].create(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('characteristic').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.map(items, populateType['characteristic'], waterfallCallback),
      //     (items, waterfallCallback) => models["characteristic"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('egg-group').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.map(items, populateType['egg-group'], waterfallCallback),
      //     (items, waterfallCallback) => models["eggGroup"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('pokemon-color').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.map(items, populateType['pokemon-color'], waterfallCallback),
      //     (items, waterfallCallback) => models["pokemonColor"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('pokemon-habitat').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.map(items, populateType['pokemon-habitat'], waterfallCallback),
      //     (items, waterfallCallback) => models["pokemonHabitat"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('pokemon-shape').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.map(items, populateType['pokemon-shape'], waterfallCallback),
      //     (items, waterfallCallback) => models["pokemonShape"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('version').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType['version'], waterfallCallback),
      //     (items, waterfallCallback) => models["version"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('pokemon-species').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType['pokemon-species'], waterfallCallback),
      //     (items, waterfallCallback) => models["pokemonSpecies"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('pokemon').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType['pokemon'], waterfallCallback),
      //     (items, waterfallCallback) => models["pokemon"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('generation').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType['generation'], waterfallCallback),
      //     (items, waterfallCallback) => models["generation"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('version-group').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType['version-group'], waterfallCallback),
      //     (items, waterfallCallback) => models["versionGroup"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('pokedex').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType['pokedex'], waterfallCallback),
      //     (items, waterfallCallback) => models["pokedex"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("berry").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["berry"], waterfallCallback),
      //     (items, waterfallCallback) => models["berry"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("berry-firmness").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["berry-firmness"], waterfallCallback),
      //     (items, waterfallCallback) => models["berryFirmness"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("berry-flavor").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["berry-flavor"], waterfallCallback),
      //     (items, waterfallCallback) => models["berryFlavor"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("contest-type").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["contest-type"], waterfallCallback),
      //     (items, waterfallCallback) => models["contestType"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("contest-effect").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["contest-effect"], waterfallCallback),
      //     (items, waterfallCallback) => models["contestEffect"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("super-contest-effect").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["super-contest-effect"], waterfallCallback),
      //     (items, waterfallCallback) => models["superContestEffect"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("encounter-method").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["encounter-method"], waterfallCallback),
      //     (items, waterfallCallback) => models["encounterMethod"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("encounter-condition").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["encounter-condition"], waterfallCallback),
      //     (items, waterfallCallback) => models["encounterCondition"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("encounter-condition-value").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["encounter-condition-value"], waterfallCallback),
      //     (items, waterfallCallback) => models["encounterConditionValue"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("evolution-chain").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["evolution-chain"], waterfallCallback),
      //     (items, waterfallCallback) => models["evolutionChain"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("evolution-trigger").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["evolution-trigger"], waterfallCallback),
      //     (items, waterfallCallback) => models["evolutionTrigger"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("item").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["item"], waterfallCallback),
      //     (items, waterfallCallback) => models["item"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("item-attribute").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["item-attribute"], waterfallCallback),
      //     (items, waterfallCallback) => models["itemAttribute"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("item-category").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["item-category"], waterfallCallback),
      //     (items, waterfallCallback) => models["itemCategory"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("item-fling-effect").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["item-fling-effect"], waterfallCallback),
      //     (items, waterfallCallback) => models["itemFlingEffect"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("item-pocket").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["item-pocket"], waterfallCallback),
      //     (items, waterfallCallback) => models["itemPocket"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("machine").find({}).limit(700).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["machine"],waterfallCallback),
      //     (items, waterfallCallback) => models["machine"].insertMany(items, waterfallCallback),
      //     (args, waterfallCallback) => db.collection("machine").find({}).skip(700).limit(700).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["machine"],waterfallCallback),
      //     (items, waterfallCallback) => models["machine"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("move").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["move"], waterfallCallback),
      //     (items, waterfallCallback) => models["move"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("move-ailment").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["move-ailment"], waterfallCallback),
      //     (items, waterfallCallback) => models["moveAilment"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("move-battle-style").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["move-battle-style"], waterfallCallback),
      //     (items, waterfallCallback) => models["moveBattleStyle"].insertMany(items, (err, res) => { console.log(res);waterfallCallback(err, res)}),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("move-category").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["move-category"], waterfallCallback),
      //     (items, waterfallCallback) => models["moveCategory"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("move-damage-class").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["move-damage-class"], waterfallCallback),
      //     (items, waterfallCallback) => models["moveDamageClass"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("move-learn-method").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["move-learn-method"], waterfallCallback),
      //     (items, waterfallCallback) => models["moveLearnMethod"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("move-target").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["move-target"], waterfallCallback),
      //     (items, waterfallCallback) => models["moveTarget"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("location").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["location"], waterfallCallback),
      //     (items, waterfallCallback) => models["location"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("location-area").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["location-area"], waterfallCallback),
      //     (items, waterfallCallback) => models["locationArea"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("pal-park-area").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["pal-park-area"], waterfallCallback),
      //     (items, waterfallCallback) => models["palParkArea"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("region").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["region"], waterfallCallback),
      //     (items, waterfallCallback) => models["region"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("ability").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["ability"], waterfallCallback),
      //     (items, waterfallCallback) => models["ability"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("gender").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["gender"], waterfallCallback),
      //     (items, waterfallCallback) => models["gender"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("growth-rate").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["growth-rate"], waterfallCallback),
      //     (items, waterfallCallback) => models["growthRate"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("nature").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["nature"], waterfallCallback),
      //     (items, waterfallCallback) => models["nature"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("pokeathlon-stat").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["pokeathlon-stat"], waterfallCallback),
      //     (items, waterfallCallback) => models["pokeathlonStat"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("pokemon").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["pokemon"], waterfallCallback),
      //     (items, waterfallCallback) => models["pokemon"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("pokemon-form").find({}).limit(700).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["pokemon-form"], waterfallCallback),
      //     (items, waterfallCallback) => models["pokemonForm"].insertMany(items, waterfallCallback),
      //     (args, waterfallCallback) => db.collection("pokemon-form").find({}).skip(700).limit(700).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["pokemon-form"], waterfallCallback),
      //     (items, waterfallCallback) => models["pokemonForm"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("stat").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["stat"], waterfallCallback),
      //     (items, waterfallCallback) => models["stat"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback) => {
      //   async.waterfall([
      //     (waterfallCallback) => db.collection("type").find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.mapSeries(items, populateType["type"], waterfallCallback),
      //     (items, waterfallCallback) => models["type"].insertMany(items, waterfallCallback),
      //   ], seriesCallback)
      // },

    ], (err, data) => {
      // console.log(err)
      if(err) console.log("Before end", err)
      // console.log(data)
      db.close();
      process.exit()
    })


})
