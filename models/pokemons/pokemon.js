var mongo = require('../../services/mongodb');
var { getProjection } = require('../../utils');
var { VersionGameIndex, VersionEncounterDetail } = require('../commonModels')

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var LocationAreaEncounter = new Schema({
  location_area:           { type: ObjectId, ref: "LocationArea", default: null},
  version_details:         [VersionEncounterDetail],
},{_id: false})
var PokemonSprites = new Schema({
  front_default:           { type: String, default: null },
  front_shiny:             { type: String, default: null },
  front_female:            { type: String, default: null },
  front_shiny_female:      { type: String, default: null },
  back_default:            { type: String, default: null },
  back_shiny:              { type: String, default: null },
  back_female:             { type: String, default: null },
  back_shiny_female:       { type: String, default: null },
},{_id: false})
var PokemonStat = new Schema({
  stat:                    { type: ObjectId, ref: "Stat", default: null},
  effort:                  { type: Number, default: null },
  base_stat:               { type: Number, default: null },
},{_id: false})
var PokemonMoveVersion = new Schema({
  move_learn_method:       { type: ObjectId, ref: "MoveLearnMethod", default: null},
  version_group:           { type: ObjectId, ref: "VersionGroup", default: null},
  level_learned_at:        { type: Number, default: null },
},{_id: false})
var PokemonMove = new Schema({
  move:                    { type: ObjectId, ref: "Move", default: null},
  version_group_details:   [PokemonMoveVersion],
},{_id: false})
var PokemonHeldItemVersion = new Schema({
  version:                 { type: ObjectId, ref: "Version", default: null},
  rarity:                  { type: Number, default: null },
},{_id: false})
var PokemonHeldItem = new Schema({
  item:                    { type: ObjectId, ref: "Item", default: null},
  version_details:         [PokemonHeldItemVersion],
},{_id: false})
var PokemonType = new Schema({
  slot:                    { type: Number, default: null },
  type:                    { type: ObjectId, ref: "Type", default: null},
},{_id: false})
var PokemonAbility = new Schema({
  is_hidden:               { type: Boolean, default: false  },
  slot:                    { type: Number, default: null },
  ability:                 { type: ObjectId, ref: "Ability", default: null},
},{_id: false})
var PokemonSchema = new Schema({
  pokeapi_id:              { type: Number, required: true },
  name:                    { type: String, required: true },
  base_experience:         { type: Number, default: null },
  height:                  { type: Number, default: null },
  is_default:              { type: Boolean, default: false },
  order:                   { type: Number, default: null },
  weight:                  { type: Number, default: null },
  abilities:               [PokemonAbility],
  forms:                   [{type: ObjectId, ref: "PokemonForm", default: null}],
  game_indices:            [VersionGameIndex],
  held_items:              [PokemonHeldItem],
  location_area_encounters:[LocationAreaEncounter],
  moves:                   [PokemonMove],
  sprites:                 PokemonSprites,
  species:                 { type: ObjectId, ref: "PokemonSpecies", default: null},
  stats:                   [PokemonStat],
  types:                   [PokemonType],
},{
  versionKey: false,
  timestamp: true
})


class Pokemon {
  static getPokemons (parent, { query, skip, limit }, Models, info) {
    const projection = getProjection(info);
    console.log(projection)

    return Models.pokemon.find(query)
        .select(projection)
        .skip(skip)
        .limit(limit).sort({pokeapi_id: 1})
        .then(data => data)
        .catch(error => error)
  }

  static getPokemon (parent, {id}, Models, info) {
    const projection = getProjection(info);
    console.log(parent)
      if (parent) {
        if (parent._id) { id = parent._id }
        if (parent.pokemon) { id = parent.pokemon }
      }

    return Models.pokemon.findById(id)
        .select(projection)
        .then(data => data)
        .catch(error => error)
  }

  static getStats (parent, {query = {}}, Models, info, field) {
    const projection = getProjection(info);
    console.log(parent);console.log(projection);console.log(field);


      if (parent) {
        Object.keys(projection).forEach(key => {
          query._id = {$in: parent[field].map(i => Models.type.ObjectId(i))}
        })
      }

		return Models.type.find(query)
        .select(projection)
        .then(data => data)
        .catch(error => error)
  }
}




PokemonSchema.pre('save', function(next) {
  console.log("heyyyo")
  var currentDate = new Date();
  this.updated_at = currentDate;
  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate;

  next();
});

PokemonSchema.virtual('id').get(function() {
  return this._id;
});

PokemonSchema.set('toJSON', {
  virtuals: true
});

PokemonSchema.loadClass(Pokemon)

module.exports = mongo.model('Pokemon', PokemonSchema);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
