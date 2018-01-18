var mongo = require('../services/mongodb');

var Schema = mongo.Schema;
var ObjectId = Schema.ObjectId;

var Ability = new Schema({
  slot: {
    type: Number
  },
  ability:{
    type: ObjectId,
    ref: 'Ability',
  },
  is_hidden: {type: Boolean, default: false}
},{
  _id: false,
})

var FlavorText = new Schema({
  text: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: ""
  },
  version_group:{
    type: String,
    default: ""
  }
},{
  _id: false,
})

var Stat = new Schema({
  stat: {
    type: ObjectId,
    ref: "Stat",
  },
  effort: {
    type: String,
    default: ""
  },
  base_stat:{
    type: String,
    default: ""
  }
},{
  _id: false,
})

var Type = new Schema({
  slot:{
    type: Number,
  },
  type:{
    type: ObjectId,
    ref: 'Type',
  }
},{
  _id: false,
})

var Pokemon = new Schema({
  name: {
    type: String,
    required: true
  },
  pokeapi_id: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    default: ""
  },
  weight: {
    type: Number,
    default: 0
  },
  stats: {
    type: [Stat],
    default: []
  },
  abilities: {
    type: [Ability],
    default: []
  },
  sprites: {
    type: Object,
    default: {}
  },
  // held_items:             { type: [ObjectId], ref: 'Items' default: [] },
  order: {
    type: Number,
    default: 0
  },
  base_experience: {
    type: Number,
    default: 0
  },
  types: {
    type: [Type],
    default: [],
  },
  is_default: {type: Boolean, default: false}
}, {
  versionKey: false,
  timestamp: true
});

Pokemon.pre('save', function(next) {
  console.log("heyyyo")
  var currentDate = new Date();
  this.updated_at = currentDate;
  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate;

  next();
});

Pokemon.virtual('id').get(function() {
  return this._id;
});

Pokemon.set('toJSON', {
  virtuals: true
});

module.exports = mongo.model('Pokemon', Pokemon);

// module.exports.fields = fields;
module.exports.ObjectId = mongo.Types.ObjectId;
