module.exports = `

  scalar Date

  type Pokemon {
    id: ID!
    name: String!
    color: String
    weight: Float
    stats: [PokemonStat]
    abilities: [Ability]
    order: Int
    base_experience: Int
    types: [PokemonType]
    is_default: Boolean
  }

  type PokemonStat {
    slot: Int
    type: Type
  }

  type PokemonType {
    stat: Stat
    effort: String
    base_stat: String
  }

  type Stat {
    id: ID!
    name: String!
    is_battle_only: Boolean
  }

  type Ability {
    id: ID!
    name: String!
    flavor_texts: [AbilityFlavorText]
    is_main_series: Boolean
    generation: Generation
    effect_entries: [AbilityEffectEntry]
    effect_changes: [AbilityEffectChange]
  }

  type AbilityFlavorText {
    text: String,
    language: String,
    version_group: String,
  }

  type AbilityEffectEntry {
    short_effect: String
    effect: String
    language:String
  }

  type AbilityEffectChange {
    effect_entries: [AbilityEffectChangeEffectEntry],
    version_group: VersionGroup
  }

  type AbilityEffectChangeEffectEntry {
    effect: String
    language: String
  }

  type Type {
    id: ID!
    name: String!
    generation: Generation
    damage_relations:[TypeDamageRelation]
  }

  type TypeDamageRelation {
    half_damage_from: [Type]
    no_damage_from: [Type]
    half_damage_to: [Type]
    double_damage_from:[Type]
    no_damage_to: [Type]
    double_damage_to: [Type]
  }

  type Generation {
    id: ID!
    name: String!
  }

  type VersionGroup {
    id: ID!
    name: String!
    generation: Generation
    regions: [Region]
    pokedexes: [Pokedex]
    order: Int
  }

  type Version {
    id: ID!
    name: String!
    version_groups: [VersionGroup]
  }

  type Region {
    id: ID!
    name: String!
    locations: [Location]
    version_groups: [VersionGroup]
    main_generation: Generation
    pokedexes: [Pokedex]
  }

  type Pokedex {
    id: ID!
    name: String!
    regions: [Region]
    version_groups: [VersionGroup]
    is_main_series: Boolean
    description: String
  }

  type Location {
    id: ID!
    name: String
    region: Region
    game_indices:[LocationGameIndex]
  }

  type LocationGameIndex {
    generation: Generation
    game_index: Int
  }

  type Query {
    Generation(id: ID!): Generation
    Generations(skip: Int, limit: Int): [Generation]
  }

  schema {
    query:Query
  }
`;
