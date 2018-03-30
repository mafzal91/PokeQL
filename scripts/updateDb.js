var config = require('../config')
var async = require('async');
var axios = require('axios');
var fs = require('fs');
var utils = require('./utils')
var moment = require('moment')
var models = require('../models')
var mongo = require('mongodb').MongoClient

const objectZip = (keys, values) => {
  keys.reduce((accu, key, index) => ({
    ...accu,
    [key]: values[index],
  }), {});
}

const objectPromise = async obj =>
  objectZip(Object.keys(obj), await Promise.all(Object.values(obj)));


var url = `mongodb://${config.mongodb.hosts[0]}:${config.mongodb.port}/Pokemon`
mongo.connect(url, (err, db) => {

    var populateType = {
      "berry": (y, next) => {
        async.parallel({
          firmness: (cb) => findOne(models["berryFirmness"],{name:y.firmness.name},cb),
          item: (cb) => findOne(models["item"],{name:y.item.name},cb),
          natural_gift_type: (cb) => findOne(models["type"],{name:y.natural_gift_type.name},cb),
          flavors: (cb) => findMany(models["berryFlavor"], mapFind(y.flavors, "name", 'flavor.name'),cb),
        }, (err, {firmness, item, natural_gift_type, flavors}) => {
          if(err) console.log(err)

          models["berry"].findOne({pokeapi_id: y.id}).then(res => {
            res.name = y.name
            res.growth_time = y.growth_time
            res.max_harvest = y.max_harvest
            res.natural_gift_power = y.natural_gift_power
            res.size = y.size
            res.smoothness = y.smoothness
            res.soil_dryness = y.soil_dryness
            res.firmness = firmness._id;
            res.item = item._id;
            res.natural_gift_type = natural_gift_type._id;
            res.flavors = y.flavors.map(i => ({
              flavor: flavors.find(k => k.name === i.flavor.name)._id,
              potency: i.potency
            }))

            res.save()
            next(null)
          }).catch(next)
        })
      },
      "berry-firmness": (y, next) => {
        async.parallel({
          berries: (cb) => findMany(models["berry"], mapFind(y.berries, "name", 'name'),cb),
          names: (cb) => findMany(models["language"], mapFind(y.names, "name", 'language.name'),cb),
        }, (err, {names, berries}) => {
          if(err) console.log(err)
          models["berryFirmness"].findOne({pokeapi_id: y.id}).then(res => {
            res.name = y.name
            res.names = y.names.map(i => ({
              language: names.find(k => k.name === i.language.name)._id,
              name: i.name
            }))
            res.berries = berries.map(i => i._id)
            res.save(next)
          }).catch(next)
        })
      },
      "berry-flavor": (y, next) => {
        async.parallel({
          berries: (cb) => findMany(models["berry"], mapFind(y.berries, "name", 'berry.name'),cb),
          names: (cb) => findMany(models["language"], mapFind(y.names, "name", 'language.name'),cb),
          contestType: (cb) => findOne(models["contestType"], {name: y.contest_type.name},cb),
        }, (err, {names, berries,contestType}) => {
          if(err) console.log(err)
          console.log(names, berries,contestType)
          models["berryFlavor"].findOne({pokeapi_id: y.id}).then(res => {
            res.name = y.name
            res.names = y.names.map(i => ({
              language: names.find(k => k.name === i.language.name)._id,
              name: i.name
            }))
            res.berries = y.berries.map(i => ({
              potency: i.potency,
              berry: berries.find(k => k.name === i.berry.name)._id,
            }))
            res.contest_type = contestType._id
            res.save(next)
          }).catch(next)
        })
      },
      "contest-type": (y, next) => {
        async.parallel({
          names: (cb) => findMany(models["language"], mapFind(y.names, "name", 'language.name'),cb),
          berryFlavor: (cb) => findOne(models["berryFlavor"], {name: y.berry_flavor.name},cb),
        }, (err, {names, berryFlavor}) => {
          if(err) console.log(err)
          models["contestType"].findOne({pokeapi_id: y.id}).then(res => {
            res.name = y.name
            res.names = y.names.map(i => ({
              language: names.find(k => k.name === i.language.name)._id,
              name: i.name,
              color: i.color,
            }))
            res.berry_flavor = berryFlavor._id
            res.save(next)
          }).catch(next)
        })
      },
      "contest-effect": (y, next) => {
        async.parallel({
          effect_entries: (cb) => findMany(models["language"], mapFind(y.effect_entries, "name", 'language.name'),cb),
          flavor_text_entries: (cb) => findMany(models["language"], mapFind(y.flavor_text_entries, "name", 'language.name'),cb),
        }, (err, {effect_entries, flavor_text_entries}) => {
          if(err) console.log(err)
          models["contestEffect"].findOne({pokeapi_id: y.id}).then(res => {
            res.appeal = y.appeal
            res.jam = y.jam
            res.effect_entries = y.effect_entries.map(i => ({
              language: effect_entries.find(k => k.name === i.language.name)._id,
              effect: i.effect,
            }))
            res.flavor_text_entries = y.flavor_text_entries.map(i => ({
              language: flavor_text_entries.find(k => k.name === i.language.name)._id,
              flavor_text: i.flavor_text,
            }))
            res.save(next)
          }).catch(next)
        })
      },
      "super-contest-effect": (y, next) => {
        async.parallel({
          moves: (cb) => findMany(models["move"], mapFind(y.moves, "name", 'name'),cb),
          flavor_text_entries: (cb) => findMany(models["language"], mapFind(y.flavor_text_entries, "name", 'language.name'),cb),
        }, (err, {moves, flavor_text_entries}) => {
          if(err) console.log(err)
          models["superContestEffect"].findOne({pokeapi_id: y.id}).then(res => {
            res.appeal = y.appeal
            res.jam = y.jam
            res.flavor_text_entries = y.flavor_text_entries.map(i => ({
              language: flavor_text_entries.find(k => k.name === i.language.name)._id,
              flavor_text: i.flavor_text,
            }))
            res.moves = y.moves.map(i => i._id)
            res.save(next)
          }).catch(next)
        })
      },
      "encounter-method": (y, next) => {
        async.parallel({
          names: (cb) => findMany(models["language"], mapFind(y.names, "name", 'language.name'),cb),
        }, (err, {names}) => {
          if(err) next(err)
          models["encounterMethod"].findOne({pokeapi_id: y.id}).then(res => {
            res.name = y.name
            res.names = y.names.map(i => ({
              language: names.find(k => k.name === i.language.name)._id,
              name: i.name
            }))
            res.order = y.order
            res.save((err, test)=>{
              console.log(err, test)
              next(err)
            })
          }).catch((err) => {console.log(err);next(err)})
        })
      },
      "encounter-condition": (y, next) => {
        async.parallel({
          values: (cb) => findMany(models["encounterConditionValue"], mapFind(y.values, "name", 'name'),cb),
          names: (cb) => findMany(models["language"], mapFind(y.names, "name", 'language.name'),cb),
        }, (err, {names,values}) => {
          if(err) console.log(err)
          models["encounterCondition"].findOne({pokeapi_id: y.id}).then(res => {
            res.name = y.name
            res.names = y.names.map(i => ({
              language: names.find(k => k.name === i.language.name)._id,
              name: i.name
            }))
            res.values = values.map(i => i._id)
            res.save(next)
          }).catch(next)
        })
      },
      "encounter-condition-value": (y, next) => {
        async.parallel({
          condition: (cb) => findOne(models["encounterCondition"], {name: y.condition.name},cb),
          names: (cb) => findMany(models["language"], mapFind(y.names, "name", 'language.name'),cb),
        }, (err, {names, condition}) => {
          if(err) console.log(err)
          models["encounterConditionValue"].findOne({pokeapi_id: y.id}).then(res => {
            res.name = y.name
            res.names = y.names.map(i => ({
              language: names.find(k => k.name === i.language.name)._id,
              name: i.name
            }))
            res.condition = y.condition._id
            res.save(next)
          }).catch(next)
        })
      },
      "evolution-chain": (y, next) => {
        let promises = {
          baby_trigger_item: findOne(models["item"], {name: y.item.name},cb),
          chain: async () => {

            return await {

            }
          }
          item: models['item'].find({name: chain.item})
          trigger: models['evolutionTrigger'].find({name: chain.trigger})
          held_item: models['item'].find({name: chain.held_item})
          known_move: models['move'].find({name: chain.known_move})
          known_move_type: models['type'].find({name: chain.known_move_type})
          location: models['location'].find({name: chain.location})
          party_species: models['pokemonSpecies'].find({name: chain.party_species})
          party_type: models['type'].find({name: chain.party_type})
          trade_species: models['pokemonSpecies'].find({name: chain.trade_species})
        }
        objectZip(promises).then(res => ({

          models["encounterConditionValue"].findOne({pokeapi_id: y.id}).then(res => {
            res.save()
          })
        })
        async.parallel({
          item: (cb) => findOne(models["item"], {name: y.item.name},cb),
          chain: (cb) => {
            async.map(y.chain.evolves_to, (chain, mapCb) => {

              let promises = {
                item: models['item'].find({name: chain.item})
                trigger: models['evolutionTrigger'].find({name: chain.trigger})
                held_item: models['item'].find({name: chain.held_item})
                known_move: models['move'].find({name: chain.known_move})
                known_move_type: models['type'].find({name: chain.known_move_type})
                location: models['location'].find({name: chain.location})
                party_species: models['pokemonSpecies'].find({name: chain.party_species})
                party_type: models['type'].find({name: chain.party_type})
                trade_species: models['pokemonSpecies'].find({name: chain.trade_species})
              }
              objectZip(promises).then(res => ({
                gender: chain.gender,
                min_level: chain.min_level,
                min_happiness: chain.min_happiness,
                min_beauty: chain.min_beauty,
                min_affection: chain.min_affection,
                needs_overworld_rain: chain.needs_overworld_rain,
                relative_physical_stats: chain.relative_physical_stats,
                time_of_day: chain.time_of_day,
                turn_upside_down: chain.turn_upside_down,
                ...res
              }))

            }, (err, res) => {
              let result = {
                is_baby
                species
                evolution_details
                evolves_to: res.
              }

            })
          },
        }, (err, {names, condition}) => {
          if(err) console.log(err)
          models["encounterConditionValue"].findOne({pokeapi_id: y.id}).then(res => {
            res.baby_trigger_item = item._id
            res.chain = chain.map(i => ({
            }))
            res.save(next)
          }).catch(next)
        })
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

    function getProperty( propertyName, object ) {
      var parts = propertyName.split( "." ),
        length = parts.length,
        i,
        property = object || this;

      for ( i = 0; i < length; i++ ) {
        property = property[parts[i]];
      }

      return property;
    }

    const mapFind = (items, key, location) => {
      return items.map(i => {
        return {[key]: getProperty(location, i)}
      })
    }

    const findOnePromise = (model, toFind, callback) => {
      return model.findOne(toFind)
    }

    const findManyPromise = async (model, toFindArray, callback) => {
      var findFuncs = toFindArray.map(i => () => findOne(model, i, next))

      return await Promise.all(findFuncs)
    }

    async.series([
      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('berry').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.each(items, populateType['berry'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('berry-firmness').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.each(items, populateType['berry-firmness'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('berry-flavor').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.each(items, populateType['berry-flavor'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('contest-type').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.each(items, populateType['contest-type'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('contest-effect').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.each(items, populateType['contest-effect'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('super-contest-effect').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.each(items, populateType['super-contest-effect'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('encounter-method').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['encounter-method'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('encounter-condition').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.each(items, populateType['encounter-condition'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('encounter-condition-value').find({}).toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.each(items, populateType['encounter-condition-value'], waterfallCallback),
      //   ], seriesCallback)
      // },

      (seriesCallback)=>{
        async.waterfall([
          (waterfallCallback) => db.collection('encounter-condition-value').find({}).toArray(waterfallCallback),
          (items, waterfallCallback) => async.each(items, populateType['encounter-condition-value'], waterfallCallback),
        ], seriesCallback)
      },
    ], (err, data) => {
      // console.log(err)
      if(err) console.log("Before end", err)
      // console.log(data)
      db.close();
      process.exit()
    })


})
