module.exports = `

  scalar Date

  type Pokemon {
    id: ID!
    name: String!
    color: String
    weight: Float
    stats: [PokemonStat]
    abilities: [PokemonAbility]
    order: Int
    base_experience: Int
    types: [PokemonType]
    is_default: Boolean
  }

  type PokemonStat {
    stat: Stat
    effort: String
    base_stat: String
  }

  type PokemonAbility {
    slot: Int
    ability: Ability
    is_hidden: Boolean
  }

  type PokemonType {
    slot: Int
    type: Type
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
    damage_relations:TypeDamageRelations
  }

  type TypeDamageRelations {
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
    locations(skip:Int, limit:Int): [Location]
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
    Pokemon(id: ID!): Pokemon
    Pokemons(skip: Int, limit: Int): [Pokemon]

    Ability(id: ID!): Ability
    Abilities(skip: Int, limit: Int): [Ability]

    Stat(id: ID!): Stat
    Stats(skip: Int, limit: Int): [Stat]

    Type(id: ID!): Type
    Types(skip: Int, limit: Int): [Type]

    Generation(id: ID!): Generation
    Generations(skip: Int, limit: Int): [Generation]

    Version(id: ID!): Version
    Versions(skip: Int, limit: Int): [Version]

    VersionGroup(id: ID!): VersionGroup
    VersionGroups(skip: Int, limit: Int): [VersionGroup]

    Region(id: ID!): Region
    Regions(skip: Int, limit: Int): [Region]

    Location(id: ID!): Location
    Locations(skip: Int, limit: Int): [Location]

    Pokedex(id: ID!): Pokedex
    Pokedexes(skip: Int, limit: Int): [Pokedex]
  }

  schema {
    query:Query
  }
`;
