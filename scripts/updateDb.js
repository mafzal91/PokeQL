var config = require('../config')
var async = require('async');
var axios = require('axios');
var fs = require('fs');
var utils = require('./utils')
var moment = require('moment')
var models = require('../models')
var mongo = require('mongodb').MongoClient

const objectZip = (keys, values) => {
  return keys.reduce((accu, key, index) => ({
    ...accu,
    [key]: values[index],
  }), {});
}

const objectPromise = async obj =>
  objectZip(Object.keys(obj), await Promise.all(Object.values(obj)));

const objectPromiseMixed = async obj => {
  var functionsOnly = Object.keys(obj).reduce((accu, i) => {
    return (obj[i] && obj[i].then !== undefined && typeof(obj[i].then) === 'function') ? {...accu, [i]:obj[i] }:accu
  }, {})
  return {...obj, ...await objectPromise(functionsOnly) }
}


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

            res.save(next)
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
        objectPromiseMixed({
          appeal: y.appeal,
          jam: y.jam,
          flavor_text_entries: Promise.all(y.flavor_text_entries.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              flavor_text: i.flavor_text
            })
          )),
          moves: findManyPromises['move'](mapFind(y.moves, "name", 'name')).then(res => res.map(i => i._id)),
        }).then(res => {
          findPromises['superContestEffect']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
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
      "encounter-condition-value": (y) => {
        return objectPromiseMixed({
          name: y.name,
          names: populateNames(y.names),
          condition: findPromises['encounterCondition']({name: y.condition.name}),
        })
        .then(res => {
          return findPromises['encounterConditionValue']({pokeapi_id: y.id}).then(entity => {
            return entity.set(res).save()
          })
        })
        .then(res => res)
        .catch(err => err)
      },
      "evolution-chain": (y, next) => {
        const mapChain = async (chain) => {
          return await Promise.all(chain.map(i => objectPromiseMixed({
            is_baby: i.is_baby,
            species: findOnePromise(models["pokemonSpecies"], {name: i.species.name}).then(res => res._id),
            evolves_to: mapChain(i.evolves_to),
            evolution_details: Promise.all(i.evolution_details.map(k=>
              objectPromiseMixed({
                item: k.item ? findPromises['item']({name: k.item.name}).then(res => res._id):null,
                trigger: k.item ? findPromises['evolutionTrigger']({name: k.trigger.name}).then(res => res._id):null,
                gender: k.gender,
                held_item: k.held_item ? findPromises['item']({name: k.held_item.name}).then(res => res._id):null,
                known_move: k.known_move ? findPromises['move']({name: k.known_move.name}).then(res => res._id):null,
                known_move_type: k.known_move_type ? findPromises['type']({name: k.known_move_type.name}).then(res => res._id):null,
                location: k.location ? findPromises['location']({name: k.location.name}).then(res => res._id):null,
                min_level: k.min_level,
                min_happiness: k.min_happiness,
                min_beauty: k.min_beauty,
                min_affection: k.min_affection,
                needs_overworld_rain: k.needs_overworld_rain,
                party_species: k.party_species ? findPromises['pokemonSpecies']({name: k.party_species.name}).then(res => res._id):null,
                party_type: k.party_type ? findPromises['type']({name: k.party_type.name}).then(res => res._id):null,
                relative_physical_stats: k.relative_physical_stats,
                time_of_day: k.time_of_day,
                trade_species: k.trade_species ? findPromises['pokemonSpecies']({name: k.trade_species.name}).then(res => res._id):null,
                turn_upside_down: k.turn_upside_down,
              })
            ))
          })))
        }

        let promises = {
          baby_trigger_item: y.baby_trigger_item ? findPromises["item"]({name: y.baby_trigger_item.name}).then(res => res._id):null,
          chain: mapChain([y.chain]).then(res => res[0]),
        }

        objectPromise(promises).then(res => {
          models["evolutionChain"].findOne({pokeapi_id: y.id}).then(entity => {
            entity.set(res)
            entity.save(next)
          })
        }).catch(err => {
          console.log("----",err)
          next(err)
        })
      },
      "evolution-trigger": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          names: Promise.all(y.names.map(i => {
            return objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}).then(res => res._id),
              name: i.name,
            })
          })),
          pokemon_species: findManyPromises["pokemonSpecies"](mapFind(y.pokemon_species,'name','name'),),
        }).then(res => {
          findPromises["evolutionTrigger"]({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        })
      },
      "generation": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          abilities: findManyPromises['ability'](mapFind(y.abilities, 'name', 'name'),),
          names: Promise.all(y.names.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              name: i.name,
            })
          )),
          main_region: findPromises['region']({name: y.main_region.name},),
          moves: findManyPromises['move'](mapFind(y.moves,'name','name'),),
          pokemon_species: findManyPromises['pokemonSpecies'](mapFind(y.pokemon_species,'name','name'),),
          types: findManyPromises['type'](mapFind(y.types,'name','name'),),
          version_groups: findManyPromises['versionGroup'](mapFind(y.version_groups,'name','name'),),
        }).then(res => {
          findPromises["generation"]({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        })
      },
      "pokedex": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          is_main_series: y.is_main_series,
          descriptions: Promise.all(y.descriptions.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              description: i.description,
            })
          )),
          names: Promise.all(y.names.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              name: i.name,
            })
          )),
          pokemon_entries: Promise.all(y.pokemon_entries.map(i =>
            objectPromiseMixed({
              pokemon_species: findPromises['pokemonSpecies']({name: i.pokemon_species.name}),
              entry_number: i.entry_number,
            })
          )),
          region: y.region ? findPromises['region']({name: y.region.name},):y.region,
          version_groups: findManyPromises['versionGroup'](mapFind(y.version_groups, 'name', 'name')),
        }).then(res => {
          findPromises['pokedex']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
      },
      "version": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          names: Promise.all(y.names.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              name: i.name,
            })
          )),
          version_group: findPromises['versionGroup']({name: y.version_group.name},),
        }).then(res => {
          console.log(findPromises.version)
          findPromises['version']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
      },
      "version-group": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          order: y.order,
          generation: findPromises['generation']({name: y.generation.name}),
          move_learn_methods: findManyPromises['moveLearnMethod'](mapFind(y.move_learn_methods, 'name', 'name'),),
          pokedexes: findManyPromises['pokedex'](mapFind(y.pokedexes, 'name', 'name'),),
          regions: findManyPromises['region'](mapFind(y.regions, 'name', 'name'),),
          versions: findManyPromises['version'](mapFind(y.versions, 'name', 'name'),),
        }).then(res => {
          findPromises['versionGroup']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
      },
      "item": (y) => {
        if(y.baby_trigger_for == null) return
        else {
        return objectPromiseMixed({
          name: y.name,
          cost: y.cost,
          fling_power: y.fling_power,
          fling_effect: y.fling_effect ? findPromises['itemFlingEffect']({name: y.fling_effect.name},):null,
          attributes: findManyPromises['itemAttribute'](mapFind(y.attributes, 'name','name'),),
          category: findPromises['itemCategory']({name: y.category.name},),
          effect_entries: Promise.all(y.effect_entries.map(i =>
            objectPromiseMixed({
              effect: i.effect,
              short_effect: i.short_effect,
              language: findPromises['language']({name: i.language.name},)
            })
          )),
          flavor_text_entries: Promise.all(y.flavor_text_entries.map(i =>
            objectPromiseMixed({
              text: i.text,
              language: findPromises['language']({name: i.language.name},),
              version_group: findPromises['versionGroup']({name: i.version_group.name},),
            })
          )),
          game_indices: Promise.all(y.game_indices.map(i =>
            objectPromiseMixed({
              game_index: i.game_index,
              generation: findPromises['generation']({name: i.generation.name},),
            })
          )),
          names: Promise.all(y.names.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              name: i.name,
            })
          )),
          sprites: y.sprites,
          held_by_pokemon: Promise.all(y.held_by_pokemon.map(i =>
            objectPromiseMixed({
              pokemon: findPromises['pokemon']({name: i.pokemon.name}),
              version_details: Promise.all(i.version_details.map(k =>
                objectPromiseMixed({
                  rarity: k.rarity,
                  version: findPromises['version']({name: k.version.name}),
                })
              )),
            })
          )),
          baby_trigger_for: y.baby_trigger_for ? findPromises['evolutionChain']({pokeapi_id: getApiId(y.baby_trigger_for.url)}).then(i => i._id):null,
          machines: Promise.all(y.machines.map(i =>
            objectPromise({
              machine: findPromises['machine']({pokeapi_id: getApiId(i.machine.url)}),
              version_group: findPromises['versionGroup']({name: i.version_group.name}),
            })
          ))
        }).then(res => {
          return findPromises['item']({pokeapi_id: y.id}).then(entity => {
            return entity.set(res).save()
          })
        }).then(res => res).catch(err => err)
        }
      },
      "item-attribute": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          items: findManyPromises['item'](mapFind(y.items, 'name','name')),
          names: Promise.all(y.names.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              name: i.name,
            })
          )),
          descriptions: Promise.all(y.descriptions.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              description: i.description,
            })
          )),
        }).then(res => {
          findPromises['itemAttribute']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        })
      },
      "item-category": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          items: findManyPromises['item'](mapFind(y.items, 'name','name')),
          names: Promise.all(y.names.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              name: i.name,
            })
          )),
          pocket: findPromises['itemPocket']({name: y.pocket.name}),
        }).then(res => {
          findPromises['itemCategory']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        })
      },
      "item-fling-effect": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          items: findManyPromises['item'](mapFind(y.items, 'name','name')),
          effect_entries: Promise.all(y.effect_entries.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              effect: i.effect,
            })
          )),
        }).then(res => {
          findPromises['itemFlingEffect']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        })
      },
      "item-pocket": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          categories: findManyPromises['itemCategory'](mapFind(y.categories, 'name','name')),
          names: Promise.all(y.names.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              name: i.name,
            })
          )),
        }).then(res => {
          findPromises['itemPocket']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        })
      },
      "machine": (y, next) => {
        objectPromiseMixed({
          item: findPromises['item']({name: y.item.name},),
          move: findPromises['move']({name: y.move.name},),
          version_group: findPromises['versionGroup']({name: y.version_group.name},),
        }).then(res => {
          findPromises['machine']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        })
      },
      "move": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          accuracy: y.accuracy,
          effect_chance: y.effect_chance,
          pp: y.pp,
          priority: y.priority,
          power: y.power,
          contest_combos: y.contest_combos ? objectPromiseMixed({
            normal: objectPromiseMixed({
              use_before: y.contest_combos.normal.use_before ? findManyPromises['move'](mapFind(y.contest_combos.normal.use_before, 'name','name'),):[],
              use_after: y.contest_combos.normal.use_after ? findManyPromises['move'](mapFind(y.contest_combos.normal.use_after, 'name','name'),):[],
            }),
            super: objectPromiseMixed({
              use_before: y.contest_combos.super.use_before ? findManyPromises['move'](mapFind(y.contest_combos.super.use_before, 'name','name'),):[],
              use_after: y.contest_combos.super.use_after ? findManyPromises['move'](mapFind(y.contest_combos.super.use_after, 'name','name'),):[],
            }),
          }):y.contest_combos,
          contest_type: y.contest_type ? findPromises['contestType']({name: y.contest_type.name},):y.contest_type,
          contest_effect: y.contest_effect ? findPromises['contestType']({name: y.contest_effect.name},):y.contest_effect,
          damage_class: y.damage_class ? findPromises['moveDamageClass']({name: y.damage_class.name},):y.damage_class,
          effect_entries: Promise.all(y.effect_entries.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              effect: i.effect,
            })
          )),
          effect_changes: Promise.all(y.effect_changes.map(i =>
            objectPromiseMixed({
              version_group: findPromises['versionGroup']({name: i.version_group.name}),
              effect_entries: Promise.all(i.effect_entries.map(k =>
                objectPromiseMixed({
                  language: findPromises['language']({name: k.language.name}),
                  effect: k.effect,
                })
              )),
            })
          )),
          flavor_text_entries: Promise.all(y.flavor_text_entries.map(i =>
            objectPromiseMixed({
              flavor_text: i.flavor_text,
              language: findPromises['language']({name: i.language.name}),
              version_group: findPromises['versionGroup']({name: i.version_group.name}),
            })
          )),
          generation: findPromises['generation']({name: y.generation.name}),
          machines: Promise.all(y.machines.map(i =>
            objectPromiseMixed({
              machine: findPromises['machine']({id: getApiId(i.machine.url)}),
              version_group: findPromises['versionGroup']({name: i.version_group.name}),
            })
          )),
          meta: y.meta ? objectPromiseMixed({
            ailment: y.meta.ailment ? findPromises['moveAilment']({name: y.meta.ailment.name}):y.meta.ailment,
            category: y.meta.category ? findPromises['moveCategory']({name: y.meta.category.name},):y.meta.category,
            min_hits: y.meta.min_hits,
            max_hits: y.meta.max_hits,
            min_turns: y.meta.min_turns,
            max_turns: y.meta.max_turns,
            drain: y.meta.drain,
            healing: y.meta.healing,
            crit_rate: y.meta.crit_rate,
            ailment_chance: y.meta.ailment_chance,
            flinch_chance: y.meta.flinch_chance,
            stat_chance: y.meta.stat_chance,
          }):y.meta,
          names: Promise.all(y.names.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              name: i.name,
            })
          )),
          past_values: Promise.all(y.past_values.map(i =>
            objectPromiseMixed({
              accuracy: i.accuracy,
              effect_chance: i.effect_chance,
              power: i.power,
              pp: i.pp,
              effect_entries: Promise.all(i.effect_entries.map(k =>
                objectPromiseMixed({
                  language: findPromises['language']({name: k.language.name}),
                  effect: k.effect,
                })
              )),
              type: i.type ? findPromises['type']({name: i.type.name}):null,
              version_group: findPromises['versionGroup']({name: i.version_group.name}),
            })
          )),
          stat_changes: Promise.all(y.stat_changes.map(i =>
            objectPromiseMixed({
              change: i.change,
              stat: findPromises['stat']({name: i.stat.name}),
            })
          )),
          super_contest_effect: y.super_contest_effect ? findPromises['superContestEffect']({name: y.super_contest_effect.name}):y.super_contest_effect,
          target: y.target ? findPromises['moveTarget']({name: y.target.name}):y.target,
          type: y.target ? findPromises['type']({name: y.type.name}):y.target,
        }).then(res => {
          findPromises['move']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        })
      },
      "move-ailment": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          names: Promise.all(y.names.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              name: i.name,
            })
          )),
          moves: findManyPromises['move'](mapFind(y.moves, 'name', 'name')),
        }).then(res => {
          findPromises['moveAilment']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next);
          })
        }).catch(next);
      },
      "move-battle-style": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          names: Promise.all(y.names.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              name: i.name,
            })
          )),
        }).then(res => {
          findPromises['moveBattleStyle']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next);
          })
        }).catch(next);
      },
      "move-category": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          moves: findManyPromises['move'](mapFind(y.moves, 'name', 'name')),
          descriptions: Promise.all(y.descriptions.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              description: i.description,
            })
          )),
        }).then(res => {
          findPromises['moveCategory']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next);
          })
        }).catch(next);
      },
      "move-damage-class": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          descriptions: Promise.all(y.descriptions.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              description: i.description,
            })
          )),
          moves: findManyPromises['move'](mapFind(y.moves, 'name', 'name')),
          names: Promise.all(y.names.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              name: i.name,
            })
          )),
        }).then(res => {
          findPromises['moveDamageClass']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next);
          })
        }).catch(next);
      },
      "move-learn-method": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          descriptions: Promise.all(y.descriptions.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              description: i.description,
            })
          )),
          names: Promise.all(y.names.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              name: i.name,
            })
          )),
          version_groups: findManyPromises['versionGroup'](mapFind(y.version_groups, 'name', 'name')),
        }).then(res => {
          findPromises['moveLearnMethod']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next);
          })
        }).catch(next);
      },
      "move-target": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          descriptions: Promise.all(y.descriptions.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              description: i.description,
            })
          )),
          moves: findManyPromises['move'](mapFind(y.moves, 'name', 'name')),
          names: Promise.all(y.names.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              name: i.name,
            })
          )),
        }).then(res => {
          findPromises['moveTarget']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next);
          })
        }).catch(next);
      },
      "location": (y, next) => {

        objectPromiseMixed({
          name: y.name,
          region: y.region ? findPromises['region']({name: y.region.name}):y.region,
          names: populateNames(y.names),
          game_indices: Promise.all(y.game_indices.map(i =>
            objectPromiseMixed({
              game_index: i.game_index,
              generation: findPromises['generation']({name: i.generation.name}),
            })
          )),
          areas: findManyPromises['locationArea'](mapFind(y.areas, 'name','name'))
        }).then(res => {
          findPromises['location']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          });
        }).catch(next)
      },
      "location-area": (y) => {
        // console.log(y)
        return objectPromiseMixed({
          name: y.name,
          game_index: y.game_index,
          encounter_method_rates: Promise.all(y.encounter_method_rates.map(i =>
            objectPromiseMixed({
              encounter_method: findPromises['encounterMethod']({name: i.encounter_method.name}),
              version_details: Promise.all(i.version_details.map(k =>
                objectPromiseMixed({
                  rate: k.rate,
                  version: findPromises['version']({name: k.version.name})
                })
              )),
            })
          )),
          location: findPromises['location']({pokeapi_id: getApiId(y.location.url)}).then(res => {console.log("region",res); return res._id}),
          names: populateNames(y.names),
          pokemon_encounters: Promise.all(y.pokemon_encounters.map(i =>
            objectPromiseMixed({
              pokemon: findPromises['pokemon']({name: i.pokemon.name}),
              version_details: Promise.all(i.version_details.map(k =>
                objectPromiseMixed({
                  version: findPromises['version']({name: k.version.name}),
                  max_chance: k.max_chance,
                  encounter_details: Promise.all(k.encounter_details.map(x =>
                    objectPromiseMixed({
                      min_level: x.min_level,
                      max_level: x.max_level,
                      condition_values: findManyPromises['encounterConditionValue'](mapFind(x.condition_values, 'name','name')),
                      chance: x.chance,
                      method: findPromises['encounterMethod']({name: x.method.name}),
                    })
                  ))
                })
              ))
            })
          ))
        }).then(res => {
          console.log("Response", res)
          return findPromises['locationArea']({pokeapi_id: y.id}).then(entity => {
            return entity.set(res).save()
          });
        }).then(res => res).catch(error => {console.log(y); process.exit()})
      },
      "pal-park-area": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          names: populateNames(y.names),
          pokemon_encounters: Promise.all(y.pokemon_encounters.map(i =>
            objectPromiseMixed({
              base_score: i.base_score,
              rate: i.rate,
              pokemon_species: findPromises['pokemonSpecies']({name: i.pokemon_species.name})
            })
          ))
        }).then(res => {
          findPromises['palParkArea']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          });
        }).catch(next)
      },
      "region": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          locations: findManyPromises['location'](mapFind(y.locations, 'name', 'name')),
          main_generation: findPromises['generation']({name: y.main_generation.name}),
          names: populateNames(y.names),
          pokedexes: findManyPromises['pokedex'](mapFind(y.pokedexes, 'name', 'name')),
          version_groups: findManyPromises['versionGroup'](mapFind(y.version_groups, 'name', 'name')),
        }).then(res => {
          findPromises['region']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          });
        }).catch(next)
      },
      "ability": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          is_main_series: y.is_main_series,
          generation: findPromises['generation']({name:y.generation.name}),
          names: populateNames(y.names),
          effect_entries: Promise.all(y.effect_entries.map(i =>
            objectPromiseMixed({
              language: findPromises['language']({name: i.language.name}),
              effect: i.effect,
            })
          )),
          effect_changes: Promise.all(y.effect_changes.map(i =>
            objectPromiseMixed({
              version_group: findPromises['versionGroup']({name: i.version_group.name}),
              effect_entries: Promise.all(i.effect_entries.map(k =>
                objectPromiseMixed({
                  language: findPromises['language']({name: k.language.name}),
                  effect: k.effect,
                })
              )),
            })
          )),
          flavor_text_entries: Promise.all(y.flavor_text_entries.map(i =>
            objectPromiseMixed({
              flavor_text: i.flavor_text,
              language: findPromises['language']({name: i.language.name}),
              version_group: findPromises['versionGroup']({name: i.version_group.name}),
            })
          )),
          pokemon: Promise.all(y.pokemon.map(i =>
              objectPromiseMixed({
                is_hidden: i.is_hidden,
                slot: i.slot,
                pokemon: findPromises['pokemon']({name: i.pokemon.name}),
              })
            )),
        }).then(res => {
          findPromises['ability']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
      },
      "characteristic": (y, next) => {
        objectPromiseMixed({
          gene_modulo: y.gene_modulo,
          possible_values: y.possible_values,
          descriptions: Promise.all(y.descriptions.map(i =>
            objectPromiseMixed({
              description: i.description,
              language: findPromises['language']({name: i.language.name}),
            })
          ))
        }).then(res => {
          findPromises['characteristic']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
      },
      "egg-group": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          names: populateNames(y.names),
          pokemon_species: findManyPromises['pokemonSpecies'](mapFind(y.pokemon_species, 'name', 'name')),
        }).then(res => {
          findPromises['eggGroup']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
      },
      "gender": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          pokemon_species_details: Promise.all(y.pokemon_species_details.map(i =>
            objectPromiseMixed({
              rate: i.rate,
              pokemon_species: findPromises['pokemonSpecies']({name: i.pokemon_species.name}),
            })
          )),
          required_for_evolution: findManyPromises['pokemonSpecies'](mapFind(y.required_for_evolution, 'name', 'name')),
        }).then(res => {
          findPromises['gender']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
      },
      "growth-rate": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          formula: y.formula,
          descriptions: populateDescriptions(y.descriptions),
          levels: y.levels.map(i => ({
            level: i.level,
            experience: i.experience,
          })),
          pokemon_species: findManyPromises['pokemonSpecies'](mapFind(y.pokemon_species, 'name', 'name')),
        }).then(res => {
          findPromises['growthRate']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
      },
      "nature": (y, next) => {
        // if(!y.hates_flavor) {console.log(y); process.exit()}
        objectPromiseMixed({
          name: y.name,
          decreased_stat: y.decreased_stat ? findPromises['stat']({name: y.decreased_stat.name}):y.decreased_stat,
          increased_stat: y.increased_stat ? findPromises['stat']({name: y.increased_stat.name}):y.increased_stat,
          hates_flavor: y.hates_flavor ? findPromises['berryFlavor']({name: y.hates_flavor.name}):y.hates_flavor,
          likes_flavor: y.likes_flavor ? findPromises['berryFlavor']({name: y.likes_flavor.name}):y.likes_flavor,
          pokeathlon_stat_changes: Promise.all(y.pokeathlon_stat_changes.map(i =>
            objectPromiseMixed({
              max_change: i.max_change,
              pokeathlon_stat: findPromises['pokeathlonStat']({name: i.pokeathlon_stat.name}),
            })
          )),
          move_battle_style_preferences: Promise.all(y.move_battle_style_preferences.map(i =>
            objectPromiseMixed({
              low_hp_preference: i.low_hp_preference,
              high_hp_preference: i.high_hp_preference,
              move_battle_style: findPromises['moveBattleStyle']({name: i.move_battle_style.name})
            })
          )),
          names: populateNames(y.names),
        }).then(res => {
          findPromises['nature']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
      },
      "pokeathlon-stat": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          names: populateNames(y.names),
          affecting_natures: objectPromiseMixed({
            increase: Promise.all(y.affecting_natures.increase.map(i =>
              objectPromiseMixed({
                max_change: i.max_change,
                nature: findPromises['nature']({name: i.nature.name})
              })
            )),
            decrease: Promise.all(y.affecting_natures.decrease.map(i =>
              objectPromiseMixed({
                max_change: i.max_change,
                nature: findPromises['nature']({name: i.nature.name})
              })
            )),
          })
        }).then(res => {
          findPromises['pokeathlonStat']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
      },
      "pokemon": (y, next) => {
        if(!y.location_area_encounters) {console.log(y); process.exit()}
        objectPromiseMixed({
          name: y.name,
          base_experience: y.base_experience,
          height: y.height,
          is_default: y.is_default,
          order: y.order,
          weight: y.weight,
          abilities: Promise.all(y.abilities.map(i =>
            objectPromiseMixed({
              is_hidden: i.is_hidden,
              slot: i.slot,
              ability: findPromises['ability']({name: i.ability.name}),
            })
          )),
          forms: findManyPromises['pokemonForm'](mapFind(y.forms,'name','name')),
          game_indices: Promise.all(y.game_indices.map(i =>{
            return objectPromiseMixed({
              game_index: i.game_index,
              version: findPromises['version']({name: i.version.name}),
            })
          })),
          held_items: Promise.all(y.held_items.map(i =>
            objectPromiseMixed({
              item: findPromises['item']({name: i.item.name}),
              version_details: Promise.all(i.version_details.map(k =>
                objectPromiseMixed({
                  version: findPromises['version']({name: k.version.name}),
                  rarity: k.rarity,
                })
              ))
            })
          )),
          location_area_encounters: Promise.all(y.location_area_encounters.map(i =>
            objectPromiseMixed({
              location_area: findPromises['locationArea']({name: i.location_area.name}),
              version_details: Promise.all(i.version_details.map(k =>
                objectPromiseMixed({
                  version: findPromises['version']({name: k.version.name}),
                  max_chance: k.max_chance,
                  encounter_details: Promise.all(k.encounter_details.map(x =>
                    objectPromiseMixed({
                      min_level: x.min_level,
                      max_level: x.max_level,
                      condition_values: findManyPromises['encounterConditionValue'](mapFind(x.condition_values, 'name', 'name')),
                      chance: x.chance,
                      method: findPromises['encounterMethod']({name: x.method.name}),
                    })
                  ))
                })
              ))
            })
          )),
          moves: Promise.all(y.moves.map(i =>
            objectPromiseMixed({
              move: findPromises['move']({name: i.move.name}),
              version_group_details: Promise.all(i.version_group_details.map(k =>
                objectPromiseMixed({
                  move_learn_method: findPromises['moveLearnMethod']({name: k.move_learn_method.name}),
                  version_group: findPromises['versionGroup']({name: k.version_group.name}),
                  level_learned_at: k.level_learned_at,
                })
              ))
            })
          )),
          sprites: y.sprites,
          species: findPromises['pokemonSpecies']({name: y.species.name}),
          stats: Promise.all(y.stats.map(i =>
            objectPromiseMixed({
              stat: findPromises['stat']({name: i.stat.name}),
              effort: i.effort,
              base_stat: i.base_stat,
            })
          )),
          types: Promise.all(y.types.map(i =>
            objectPromiseMixed({
              slot: i.slot,
              type: findPromises['type']({name: i.type.name}),
            })
          ))
        }).then(res => {
          findPromises['pokemon']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
      },
      "pokemon-color": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          names: populateNames(y.names),
          pokemon_species: populateSpecies(y.pokemon_species),
        }).then(res => {
          findPromises['pokemonColor']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
      },
      "pokemon-form": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          order: y.order,
          form_order: y.form_order,
          is_default: y.is_default,
          is_battle_only: y.is_battle_only,
          is_mega: y.is_mega,
          form_name: y.form_name,
          pokemon: findPromises['pokemon']({name: y.pokemon.name}),
          sprites: y.sprites,
          version_group: findPromises['versionGroup']({name: y.version_group.name}),
          names: populateNames(y.names),
          form_names: populateNames(y.form_names)
        }).then(res => {
          findPromises['pokemonForm']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
      },
      "pokemon-habitat": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          names: populateNames(y.names),
          pokemon_species: populateSpecies(y.pokemon_species),
        }).then(res => {
          findPromises['pokemonHabitat']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
      },
      "pokemon-shape": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          names: populateNames(y.names),
          pokemon_species: populateSpecies(y.pokemon_species),
          awesome_names: Promise.all(y.awesome_names.map(i =>
            objectPromiseMixed({
              awesome_name: i.awesome_name,
              language: findPromises['language']({name: i.language.name}),
            })
          ))
        }).then(res => {
          findPromises['pokemonShape']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
      },
      "pokemon-species": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          order: y.order,
          gender_rate: y.gender_rate,
          capture_rate: y.capture_rate,
          base_happiness: y.base_happiness,
          is_baby: y.is_baby,
          hatch_counter: y.hatch_counter,
          has_gender_differences: y.has_gender_differences,
          forms_switchable: y.forms_switchable,
          growth_rate: findPromises['growthRate']({name: y.growth_rate.name}),
          pokedex_numbers: Promise.all(y.pokedex_numbers.map(i =>
            objectPromiseMixed({
              entry_number: i.entry_number,
              pokedex: findPromises['pokedex']({name: i.pokedex.name}),
            })
          )),
          egg_groups: findManyPromises['eggGroup'](mapFind(y.egg_groups, 'name', 'name')),
          color: findPromises['pokemonColor']({name: y.color.name}),
          shape: findPromises['pokemonShape']({name: y.shape.name}),
          evolves_from_species: y.evolves_from_species ? findPromises['pokemonSpecies']({name: y.evolves_from_species.name}):y.evolves_from_species,
          evolution_chain: findPromises['evolutionChain']({pokeapi_id: getApiId(y.evolution_chain.url)}),
          habitat: y.habitat ? findPromises['pokemonHabitat']({name: y.habitat.name}):y.habitat,
          generation: findPromises['generation']({name: y.generation.name}),
          names: populateNames(y.names),
          pal_park_encounters: Promise.all(y.pal_park_encounters.map(i =>
            objectPromiseMixed({
              base_score: i.base_score,
              rate: i.rate,
              area: findPromises['palParkArea']({name: i.area.name}),
            })
          )),
          flavor_text_entries: Promise.all(y.flavor_text_entries.map(i =>
            objectPromiseMixed({
              flavor_text: i.flavor_text,
              language: findPromises['language']({name: i.language.name}),
              version: findPromises['version']({name: i.version.name}),
            })
          )),
          form_descriptions: populateDescriptions(y.form_descriptions),
          genera: Promise.all(y.genera.map(i =>
            objectPromiseMixed({
              genus: i.genus,
              language: findPromises['language']({name: i.language.name}),
            })
          )),
          varieties: Promise.all(y.varieties.map(i =>
            objectPromiseMixed({
              is_default: i.is_default,
              pokemon: findPromises['pokemon']({name: i.pokemon.name}),
            })
          )),
        }).then(res => {
          findPromises['pokemonSpecies']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
      },
      "stat": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          game_index: y.game_index,
          is_battle_only: y.is_battle_only,
          affecting_moves: objectPromiseMixed({
            increase:  Promise.all(y.affecting_moves.increase.map(i =>
              objectPromiseMixed({
                change: i.change,
                move: findPromises['move']({name: i.move.name}),
              })
            )),
            decrease: Promise.all(y.affecting_moves.decrease.map(i =>
              objectPromiseMixed({
                change: i.change,
                move: findPromises['move']({name: i.move.name}),
              })
            )),
          }),
          affecting_natures: objectPromiseMixed({
            increase: findManyPromises['nature'](mapFind(y.affecting_natures.increase, 'name','name')),
            decrease: findManyPromises['nature'](mapFind(y.affecting_natures.decrease, 'name','name')),
          }),
          characteristics: findManyPromises['characteristic'](mapFind(y.characteristics, 'name','name')),
          move_damage_class: y.move_damage_class ? findPromises['moveDamageClass']({name: y.move_damage_class.name}):y.move_damage_class,
          names: populateNames(y.names),
        }).then(res => {
          findPromises['stat']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
      },
      "type": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          damage_relations: objectPromiseMixed({
            half_damage_from: findManyPromises['type'](mapFind(y.damage_relations.half_damage_from, 'name','name')),
            no_damage_from: findManyPromises['type'](mapFind(y.damage_relations.no_damage_from, 'name','name')),
            half_damage_to: findManyPromises['type'](mapFind(y.damage_relations.half_damage_to, 'name','name')),
            double_damage_from: findManyPromises['type'](mapFind(y.damage_relations.double_damage_from, 'name','name')),
            no_damage_to: findManyPromises['type'](mapFind(y.damage_relations.no_damage_to, 'name','name')),
            double_damage_to: findManyPromises['type'](mapFind(y.damage_relations.double_damage_to, 'name','name')),
          }),
          game_indices: Promise.all(y.game_indices.map(i =>
            objectPromiseMixed({
              game_index: i.game_index,
              generation: findPromises['generation']({name: i.generation.name}),
            })
          )),
          generation: findPromises['generation']({name: y.generation.name}),
          move_damage_class: y.move_damage_class ? findPromises['moveDamageClass']({name: y.move_damage_class.name}):y.move_damage_class,
          names: populateNames(y.names),
          pokemon: Promise.all(y.pokemon.map(i =>
            objectPromiseMixed({
              slot: i.slot,
              pokemon: findPromises['pokemon']({name: y.pokemon.name}),
            })
          )),
          moves: findManyPromises['move'](mapFind(y.moves, 'name','name')),
        }).then(res => {
          findPromises['type']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
      },
      "language": (y, next) => {
        objectPromiseMixed({
          name: y.name,
          official: y.official,
          iso639: y.iso639,
          iso3166: y.iso3166,
          names: populateNames(y.names),
        }).then(res => {
          findPromises['language']({pokeapi_id: y.id}).then(entity => {
            entity.set(res).save(next)
          })
        }).catch(next)
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

    const findOnePromise = (model, toFind) => {
      return model.findOne(toFind)
    }

    const findManyPromise = async (model, toFindArray) => {
      var findFuncs = toFindArray.map(i => () => findOne(model, i, next))

      return await Promise.all(findFuncs)
    }

    const findPromises = (() =>
      Object.keys(models).reduce((accu, i) => ({
          [i]: (filter, projection = '_id') => models[i].findOne(filter,projection),
          ...accu,
        }),{})
    )()

    const findManyPromises = (() =>
      Object.keys(models).reduce((accu, i) => ({
          [i]: async (filters, projection = '_id') => await Promise.all(filters.map((filter) => models[i].findOne(filter, projection))),
          ...accu,
        }),{})
    )()

    const getApiId = (url) => {
      // console.log(url)
      return url.split('/')[6]
    }

    const populateNames = async (names) => await Promise.all(names.map(i =>
      objectPromiseMixed({
        language: findPromises['language']({name: i.language.name}),
        name: i.name,
      })
    ))
    const populateDescriptions = async (descriptions) => await Promise.all(descriptions.map(i =>
      objectPromiseMixed({
        language: findPromises['language']({name: i.language.name}),
        description: i.description,
      })
    ))
    const populateSpecies = async (species) => await findManyPromises['pokemonSpecies'](mapFind(species, 'name', 'name'))

    var funcs = Object.keys(populateType).map(key =>
      (next) => {
        async.waterfall([
          (waterfallCallback) => db.collection(key).find({}).toArray(waterfallCallback),
          (items, waterfallCallback) => async.each(items, populateType[key], waterfallCallback),
        ], next)
      }
    )

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

      (seriesCallback)=>{
        async.waterfall([
          (waterfallCallback) => db.collection('super-contest-effect').find({}).toArray(waterfallCallback),
          (items, waterfallCallback) => async.each(items, populateType['super-contest-effect'], waterfallCallback),
        ], seriesCallback)
      },

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
      //   db.collection('encounter-condition-value').find({}).toArray().then(items => {
      //     return Promise.all(items.map(populateType['encounter-condition-value']))
      //   }).then(seriesCallback).catch(seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('evolution-chain').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.each(items, populateType['evolution-chain'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('evolution-trigger').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.each(items, populateType['evolution-trigger'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('generation').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.each(items, populateType['generation'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('pokedex').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.each(items, populateType['pokedex'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('version').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.each(items, populateType['version'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('version-group').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.each(items, populateType['version-group'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   db.collection('item').find({}).toArray().then(items => {
      //     return Promise.all(items.map(populateType['item']))
      //   }).then(seriesCallback).catch(seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('item-attribute').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['item-attribute'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('item-category').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['item-category'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('item-fling-effect').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['item-fling-effect'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('item-pocket').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['item-pocket'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('machine').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['machine'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('move').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['move'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('move-ailment').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['move-ailment'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('move-battle-style').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['move-battle-style'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('move-category').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['move-category'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('move-damage-class').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['move-damage-class'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('move-learn-method').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['move-learn-method'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('move-target').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['move-target'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('location').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['location'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   db.collection('location-area').find().toArray().then(items => {
      //     async.eachSeries(items, (i,next) =>
      //       populateType['location-area'](i).then(() => next())
      //     , seriesCallback)
      //   }).catch(err => console.log(err))
      //   // db.collection('location-area').find().toArray().then(items => {
      //   //   return items.map(populateType['location-area']).reduce((prev, task, index) => prev.then(task), Promise.resolve())
      //   //   // return Promise.all(items.map(populateType['location-area']))
      //   // }).then(seriesCallback).catch(seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('pal-park-area').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['pal-park-area'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('region').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['region'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('ability').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['ability'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('characteristic').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['characteristic'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('egg-group').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['egg-group'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('gender').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['gender'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('growth-rate').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['growth-rate'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('nature').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['nature'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('pokeathlon-stat').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['pokeathlon-stat'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('pokemon').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['pokemon'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('pokemon-color').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['pokemon-color'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('pokemon-form').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['pokemon-form'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('pokemon-habitat').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['pokemon-habitat'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('pokemon-shape').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['pokemon-shape'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('pokemon-species').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['pokemon-species'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('stat').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['stat'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('type').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['type'], waterfallCallback),
      //   ], seriesCallback)
      // },

      // (seriesCallback)=>{
      //   async.waterfall([
      //     (waterfallCallback) => db.collection('language').find().toArray(waterfallCallback),
      //     (items, waterfallCallback) => async.eachSeries(items, populateType['language'], waterfallCallback),
      //   ], seriesCallback)
      // },

    ], (err, data) => {
      // console.log(err)
      if(err){ console.log("Before end", err)}
      // console.log(data)
      db.close();
      process.exit()
    })


})
