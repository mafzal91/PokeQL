var commonModels = require('./commonModel_types')

module.exports = `
  scalar Date

  type Berry {
    id: ID!
    pokeapi_id: Int!
    name: String!
    growth_time: Int!
    max_harvest: Int!
    natural_gift_power: Int!
    size: Int!
    smoothness: Int!
    soil_dryness: Int!
    firmness: BerryFirmness
    flavors: [BerryFlavorPotency]
    item: Item
    natural_gift_type: Type
  }

  type BerryFlavorPotency {
    potency: Int!
    flavor: BerryFlavor
  }

  type BerryFirmness {
    id: ID!
    pokeapi_id: Int!
    name: String!
    berries: [Berry]
    names: [Name]
  }

  type BerryFlavor {
    id: ID!
    pokeapi_id: Int!
    name: String!
    berries: FlavorBerry
    contest_type: ContestType
    names: [Name]
  }

  type FlavorBerry {
    potency: Int
    berry: Berry
  }

  type ContestType {
    id: ID!
    pokeapi_id: Int!
    name: String
    berry_flavor: BerryFlavor
    names: [Name]
  }

  type ContestEffect {
    id: ID!
    pokeapi_id: Int!
    appeal: Int
    jam: Int
    effect_entries: [Effect]
    flavor_text_entries: [FlavorText]
  }

  type SuperContestEffect {
    id: ID!
    pokeapi_id: Int!
    appeal: Int
    flavor_text_entries: FlavorText
    moves: [Move]
  }

  type EncounterMethod {
    id: ID!
    pokeapi_id: Int!
    name: String!
    order: Int
    names: [Name]
  }

  type EncounterCondition {
    id: ID!
    pokeapi_id: Int!
    name: String!
    names: [Name]
    values: [EncounterConditionValue]
  }

  type EncounterConditionValue {
    id: ID!
    pokeapi_id: Int!
    name: String!
    condition: EncounterCondition
    names: [Name]
  }

  type EvolutionDetail {
    item: Item
    trigger: EvolutionTrigger
    gender: Int
    held_item: Item
    known_move: Move
    known_move_type: Type
    location: Location
    min_level: Int
    min_happiness: Int
    min_beauty: Int
    min_affection: Int
    needs_overworld_rain: Boolean
    party_species: PokemonSpecies
    party_type: Type
    relative_physical_stats: Int
    time_of_day: String
    trade_species: PokemonSpecies
    turn_upside_down: Boolean
  }

  type ChainLink {
    is_baby: Boolean
    species: PokemonSpecies
    evolution_details: [EvolutionDetail]
    evolves_to: [ChainLink]
  }
  type EvolutionChain {
    id: ID!
    pokeapi_id: Int!
    baby_trigger_item: Item
    chain: ChainLink
  }

  type EvolutionTrigger {
    id: ID!
    pokeapi_id: Int!
    name: String!
    names: [Name]
    pokemon_species: [PokemonSpecies]
  }

  type Generation {
    id: ID!
    pokeapi_id: Int!
    name: String!
    abilities: [Ability]
    names: [Name]
    main_region: Region
    moves: [Move]
    pokemon_species: [PokemonSpecies]
    types: [Type]
    version_groups: [VersionGroup]
  }

  type Pokedex {
    id: ID!
    pokeapi_id: Int!
    name: String!
    is_main_series: Boolean
    descriptions: [Description]
    names: [Name]
    pokemon_entries: [PokemonEntry]
    region: Region
    version_groups: [VersionGroup]
  }

  type PokemonEntry {
    entry_number:  Int!
    pokemon_species: PokemonSpecies!
  }

  type Version {
    id: ID!
    pokeapi_id: Int!
    name: String!
    names: [Name]
    version_group: VersionGroup
  }

  type VersionGroup {
    id: ID!
    pokeapi_id: Int!
    name: String!
    order: Int
    generation: Generation
    move_learn_methods: [MoveLearnMethod]
    pokedexes: [Pokedex]
    regions: [Region]
    versions: [Version]
  }

  type ItemHolderPokemonVersionDetail {
    rarity: String
    version: Version
  }
  type ItemHolderPokemon {
    pokemon: Pokemon
    version_details: [ItemHolderPokemonVersionDetail]
  }
  type ItemSprites {
    default: String
  }
  type Item {
    id: ID!
    pokeapi_id: Int!
    name: String!
    cost: Int
    fling_power: Int
    fling_effect: ItemFlingEffect
    attributes: [ItemAttribute]
    category: ItemCategory
    effect_entries: [VerboseEffect]
    flavor_text_entries: [VersionGroupFlavorText]
    game_indices: [GenerationGameIndex]
    names: [Name]
    sprites: ItemSprites
    held_by_pokemon: [ItemHolderPokemon]
    baby_trigger_for: EvolutionChain
    machines: [MachineVersionDetail]
  }

  type ItemAttribute {
    id: ID!
    pokeapi_id: Int!
    name: String!
    items: [Item]
    names: [Name]
    descriptions: [Description]
  }

  type ItemCategory {
    id: ID!
    pokeapi_id: Int!
    name: String!
    items: [Item]
    names: [Name]
    pocket: ItemPocket
  }

  type ItemFlingEffect {
    id: ID!
    pokeapi_id: Int!
    name: String!
    effect_entries: [Effect]
    items: [Item]
  }

  type ItemPocket {
    id: ID!
    pokeapi_id: Int!
    name: String!
    categories: [ItemCategory]
    names: [Name]
  }

  type Location {
    id: ID!
    pokeapi_id: Int!
    name: String!
    region: Region
    names: [Name]
    game_indices: [GenerationGameIndex]
    areas: [LocationArea]
  }

  type EncounterVersionDetails {
    rate: Int!
    version: Version
  }
  type EncounterMethodRate {
    encounter_method: EncounterMethod
    version_details: [EncounterVersionDetails]
  }
  type PokemonEncounter {
    pokemon: Pokemon
    version_details: [VersionEncounterDetail]
  }
  type LocationArea {
    id: ID!
    pokeapi_id: Int!
    name: String!
    game_index: Int
    encounter_method_rates: [EncounterMethodRate]
    location: Region
    names: [Name]
    pokemon_encounters: [PokemonEncounter]
  }

  type PalParkEncounterSpecies {
    base_score: Int!
    rate: Int!
    pokemon_species: PokemonSpecies
  }
  type PalParkArea {
    id: ID!
    pokeapi_id: Int!
    name: String!
    names: [Name]
    pokemon_encounters: [PalParkEncounterSpecies]
  }

  type Region {
    name: String!
    id: ID!
    pokeapi_id: Int!
    locations: [Location]
    main_generation: Generation
    names: [Name]
    pokedexes: [Pokedex]
    version_groups: [VersionGroup]
  }

  type Machine {
    id: ID!
    pokeapi_id: Int!
    item: Item
    move: Move
    version_group: VersionGroup
  }

  type ContestCombo {
    normal: ContestComboUseEffect
    super: ContestComboUseEffect
  }


  type ContestComboUseEffect {
    use_before: [Move]
    use_after: [Move]
  }
  type MoveMeta {
    ailment: MoveAilment
    category: MoveCategory
    min_hits: Int
    max_hits: Int
    min_turns: Int
    max_turns: Int
    drain: Int
    healing: Int
    crit_rate: Int
    ailment_chance: Int
    flinch_chance: Int
    stat_chance: Int
  }
  type MovePastValue {
    accuracy: Int
    effect_chance: Int
    power: Int
    pp: Int
    effect_entries: [VerboseEffect]
    type: Type
    version_group: VersionGroup
  }
  type MoveStatChange {
    change: Int
    stat: Stat
  }
  type Move {
    id: ID!
    pokeapi_id: Int!
    name: String!
    accuracy: Int
    effect_chance: Int
    pp: Int
    priority: Int
    power: Int
    contest_combos: ContestCombo
    contest_type: ContestType
    contest_effect: ContestEffect
    damage_class: MoveDamageClass
    effect_entries: [VerboseEffect]
    effect_changes: [AbilityEffectChange]
    flavor_text_entries: [FlavorText1]
    generation: Generation
    machines: [MachineVersionDetail]
    meta: MoveMeta
    names: [Name]
    past_values: [MovePastValue]
    stat_changes: [MoveStatChange]
    super_contest_effect: SuperContestEffect
    target: MoveTarget
    type: Type
  }


  type MoveAilment {
    id: ID!
    pokeapi_id: Int!
    name: String
    names: [Name]
    moves: [Move]
  }


  type MoveBattleStyle {
    id: ID!
    pokeapi_id: Int!
    name: String!
    names: [Name]
  }


  type MoveCategory {
    id: ID!
    pokeapi_id: Int!
    name: String!
    moves: [Move]
    descriptions: [Description]
  }


  type MoveDamageClass {
    id: ID!
    pokeapi_id: Int!
    name: String!
    descriptions: [Description]
    moves: [Move]
    names: [Name]
  }


  type MoveLearnMethod {
    id: ID!
    pokeapi_id: Int!
    name: String!
    descriptions:[Description]
    names:[Name]
    version_groups: [VersionGroup]
  }


  type MoveTarget {
    id: ID!
    pokeapi_id: Int!
    name: String!
    descriptions:[Description]
    moves:[Move]
    names:[Name]
  }


  type AbilityEffectChange {
    effect_entries: [Effect]
    version_group: VersionGroup
  }
  type AbilityPokemon {
    is_hidden: Boolean
    slot: Int
    pokemon: Pokemon
  }
  type Ability {
    id: ID!
    pokeapi_id: Int!
    name: String!
    is_main_series: Boolean
    generation: Generation
    names: [Name]
    effect_entries: [VerboseEffect]
    effect_changes: [AbilityEffectChange]
    flavor_text_entries: [FlavorText1]
    pokemon: [AbilityPokemon]
  }


  type Characteristic {
    id: ID!
    pokeapi_id: Int!
    gene_modulo: Boolean
    possible_values: [Int]
    descriptions:[Description]
  }


  type EggGroup {
    id: ID!
    pokeapi_id: Int!
    name: String!
    names: [Name]
    pokemon_species: [PokemonSpecies]
  }


  type PokemonSpeciesGender {
    rate: Int!
    pokemon_species: PokemonSpecies
  }
  type Gender {
    id: ID!
    pokeapi_id: Int!
    name: String!
    pokemon_species_details: [PokemonSpeciesGender]
    required_for_evolution: [PokemonSpecies]
  }


  type GrowthRateExperienceLevel {
    level: Int
    experience: Int
  }
  type GrowthRate {
    id: ID!
    pokeapi_id: Int!
    name: String!
    formula: String
    descriptions: [Description]
    levels: [GrowthRateExperienceLevel]
    pokemon_species: [PokemonSpecies]
  }


  type NatureStatChange {
    max_change: Int!
    pokeathlon_stat: PokeathlonStat
  }
  type MoveBattleStylePreference {
    low_hp_preference: Int!
    high_hp_preference: Int!
    move_battle_style: MoveBattleStyle
  }
  type Nature {
    id: ID!
    pokeapi_id: Int!
    name: String!
    decreased_stat: Stat
    increased_stat: Stat
    hates_flavor: BerryFlavor
    likes_flavor: BerryFlavor
    pokeathlon_stat_changes:[NatureStatChange]
    move_battle_style_preferences: [MoveBattleStylePreference]
    names: [Name]
  }


  type NaturePokeathlonStatAffect {
    max_change: Int!
    nature: Nature
  }


  type NaturePokeathlonStatAffectSets {
    increase: [NaturePokeathlonStatAffect]
    decrease: [NaturePokeathlonStatAffect]
  }


  type PokeathlonStat {
    id: ID!
    pokeapi_id: Int!
    name: String!
    names: [Name]
    affecting_natures: NaturePokeathlonStatAffectSets
  }


  type PokemonColor {
    id: ID!
    pokeapi_id: Int!
    name: String!
    names: [Name]
    pokemon_species: [PokemonSpecies]
  }


  type PokemonFormSprites {
    front_default: String
    front_shiny: String
    back_default: String
    back_shiny: String
  }
  type PokemonForm {
    id: ID!
    pokeapi_id: Int!
    name: String!
    order: Int
    form_order: Int
    is_default: Boolean
    is_battle_only: Boolean
    is_mega: Boolean
    form_name: String
    pokemon: Pokemon
    sprites: PokemonFormSprites
    version_group: VersionGroup
    names: [Name]
    form_names: [Name]
  }


  type PokemonHabitat {
    id: ID!
    pokeapi_id: Int!
    name: String!
    names:[Name]
    pokemon_species: [PokemonSpecies]
  }


  type AwesomeName {
    awesome_name: String!
    language: Language
  }
  type PokemonShape {
    id: ID!
    pokeapi_id: Int!
    name: String!
    names:[Name]
    pokemon_species: [PokemonSpecies]
    awesome_names: [AwesomeName]
  }


  type Genus {
    genus: String!
    language: Language
  }
  type PokemonSpeciesDexEntry {
    entry_number: Int!
    pokedex: Pokedex
  }
  type PalParkEncounterArea {
    base_score: Int!
    rate: Int!
    area: PalParkArea
  }
  type PokemonSpeciesVariety {
    is_default: Boolean
    pokemon: Pokemon
  }
  type PokemonSpecies {
    id: ID!
    pokeapi_id: Int!
    name: String!
    order: Int
    gender_rate: Int
    capture_rate: Int
    base_happiness: Int
    is_baby: Boolean
    hatch_counter: Int
    has_gender_differences: Boolean
    forms_switchable: Boolean
    growth_rate: GrowthRate
    pokedex_numbers: [PokemonSpeciesDexEntry]
    egg_groups: [EggGroup]
    color: PokemonColor
    shape: PokemonShape
    evolves_from_species: PokemonSpecies
    evolution_chain: EvolutionChain
    habitat: PokemonHabitat
    generation: Generation
    names: [Name]
    pal_park_encounters: [PalParkEncounterArea]
    flavor_text_entries: [VersionFlavorText]
    form_descriptions: [Description]
    genera: [Genus]
    varieties: [PokemonSpeciesVariety]
  }


  type MoveStatAffect {
    change: Int!
    move: Move
  }
  type MoveStatAffectSets {
    increase: [MoveStatAffect]
    decrease: [MoveStatAffect]
  }
  type NatureStatAffectSets {
    increase: [Nature]
    decrease: [Nature]
  }
  type Stat {
    id: ID!
    pokeapi_id: Int!
    name: String!
    game_index: String
    is_battle_only: Boolean
    affecting_moves: MoveStatAffectSets
    affecting_natures: NatureStatAffectSets
    characteristics: [Characteristic]
    move_damage_class: MoveDamageClass
    names: [Name]
  }


  type TypePokemon {
    slot: Int
    pokemon: Pokemon
  }
  type DamageRelations {
    half_damage_from: [Type]
    no_damage_from: [Type]
    half_damage_to: [Type]
    double_damage_from: [Type]
    no_damage_to: [Type]
    double_damage_to: [Type]
  }
  type Type {
    id: ID!
    pokeapi_id: Int!
    name: String!
    damage_relations: DamageRelations
    game_indices: [GenerationGameIndex]
    generation: Generation
    move_damage_class: MoveDamageClass
    names: [Name]
    pokemon: [TypePokemon]
    moves: [Move]
  }


  type LocationAreaEncounter {
    location_area: LocationArea
    version_details: [VersionEncounterDetail]
  }
  type PokemonSprites {
    front_default: String
    front_shiny: String
    front_female: String
    front_shiny_female: String
    back_default: String
    back_shiny: String
    back_female: String
    back_shiny_female: String
  }
  type PokemonStat {
    stat: Stat
    effort: Int
    base_stat: Int
  }
  type PokemonMoveVersion {
    move_learn_method: MoveLearnMethod
    version_group: VersionGroup
    level_learned_at: Int
  }
  type PokemonMove {
    move: Move
    version_group_details: [PokemonMoveVersion]
  }
  type PokemonHeldItemVersion {
    version: Version
    rarity: Int
  }
  type PokemonHeldItem {
    item: Item
    version_details: [PokemonHeldItemVersion]
  }
  type PokemonType {
    slot: Int
    type: Type
  }
  type PokemonAbility {
    is_hidden: Boolean
    slot: Int
    ability: Ability
  }
  type Pokemon {
    id: ID!
    pokeapi_id: Int!
    name: String!
    base_experience: Int
    height: Int
    is_default: Boolean
    order: Int
    weight: Int
    abilities: [PokemonAbility]
    forms: [PokemonForm]
    game_indices: [VersionGameIndex]
    held_items: [PokemonHeldItem]
    location_area_encounters:[LocationAreaEncounter]
    moves: [PokemonMove]
    sprites: PokemonSprites
    species: PokemonSpecies
    stats: [PokemonStat]
    types: [PokemonType]
  }

  type Language {
    id: ID!
    pokeapi_id: Int!
    name: String!
    official: Boolean!
    iso639: String!
    iso3166: String
    names: [Name]
  }

  ${commonModels}


  type Query {
    Berry(id: ID!): Berry
    Berries(skip: Int, limit: Int): [Berry]

    BerryFirmness(id: ID!): BerryFirmness
    BerryFirmnesss(skip: Int, limit: Int): [BerryFirmness]

    BerryFlavor(id: ID!): BerryFlavor
    BerryFlavors(skip: Int, limit: Int): [BerryFlavor]

    ContestType(id: ID!): ContestType
    ContestTypes(skip: Int, limit: Int): [ContestType]

    ContestEffect(id: ID!): ContestEffect
    ContestEffects(skip: Int, limit: Int): [ContestEffect]

    SuperContestEffect(id: ID!): SuperContestEffect
    SuperContestEffects(skip: Int, limit: Int): [SuperContestEffect]

    EncounterMethod(id: ID!): EncounterMethod
    EncounterMethods(skip: Int, limit: Int): [EncounterMethod]

    EncounterCondition(id: ID!): EncounterCondition
    EncounterConditions(skip: Int, limit: Int): [EncounterCondition]

    EncounterConditionValue(id: ID!): EncounterConditionValue
    EncounterConditionValues(skip: Int, limit: Int): [EncounterConditionValue]

    EvolutionChain(id: ID!): EvolutionChain
    EvolutionChains(skip: Int, limit: Int): [EvolutionChain]

    EvolutionTrigger(id: ID!): EvolutionTrigger
    EvolutionTriggers(skip: Int, limit: Int): [EvolutionTrigger]

    Generation(id: ID!): Generation
    Generations(skip: Int, limit: Int): [Generation]

    Pokedex(id: ID!): Pokedex
    Pokedexes(skip: Int, limit: Int): [Pokedex]

    Version(id: ID!): Version
    Versions(skip: Int, limit: Int): [Version]

    VersionGroup(id: ID!): VersionGroup
    VersionGroups(skip: Int, limit: Int): [VersionGroup]

    Item(id: ID!): Item
    Items(skip: Int, limit: Int): [Item]

    ItemAttribute(id: ID!): ItemAttribute
    ItemAttributes(skip: Int, limit: Int): [ItemAttribute]

    ItemCategory(id: ID!): ItemCategory
    ItemCategories(skip: Int, limit: Int): [ItemCategory]

    ItemFlingEffect(id: ID!): ItemFlingEffect
    ItemFlingEffects(skip: Int, limit: Int): [ItemFlingEffect]

    ItemPocket(id: ID!): ItemPocket
    ItemPockets(skip: Int, limit: Int): [ItemPocket]

    Location(id: ID!): Location
    Locations(skip: Int, limit: Int): [Location]

    LocationArea(id: ID!): LocationArea
    LocationAreas(skip: Int, limit: Int): [LocationArea]

    PalParkArea(id: ID!): PalParkArea
    PalParkAreas(skip: Int, limit: Int): [PalParkArea]

    Region(id: ID!): Region
    Regions(skip: Int, limit: Int): [Region]

    Machine(id: ID!): Machine
    Machines(skip: Int, limit: Int): [Machine]

    Move(id: ID!): Move
    Moves(skip: Int, limit: Int): [Move]

    MoveAilment(id: ID!): MoveAilment
    MoveAilments(skip: Int, limit: Int): [MoveAilment]

    MoveBattleStyle(id: ID!): MoveBattleStyle
    MoveBattleStyles(skip: Int, limit: Int): [MoveBattleStyle]

    MoveCategory(id: ID!): MoveCategory
    MoveCategories(skip: Int, limit: Int): [MoveCategory]

    MoveDamageClass(id: ID!): MoveDamageClass
    MoveDamageClasses(skip: Int, limit: Int): [MoveDamageClass]

    MoveLearnMethod(id: ID!): MoveLearnMethod
    MoveLearnMethods(skip: Int, limit: Int): [MoveLearnMethod]

    MoveTarget(id: ID!): MoveTarget
    MoveTargets(skip: Int, limit: Int): [MoveTarget]

    Ability(id: ID!): Ability
    Abilities(skip: Int, limit: Int): [Ability]

    Characteristic(id: ID!): Characteristic
    Characteristics(skip: Int, limit: Int): [Characteristic]

    EggGroup(id: ID!): EggGroup
    EggGroups(skip: Int, limit: Int): [EggGroup]

    Gender(id: ID!): Gender
    Genders(skip: Int, limit: Int): [Gender]

    GrowthRate(id: ID!): GrowthRate
    GrowthRates(skip: Int, limit: Int): [GrowthRate]

    Nature(id: ID!): Nature
    Natures(skip: Int, limit: Int): [Nature]

    PokeathlonStat(id: ID!): PokeathlonStat
    PokeathlonStats(skip: Int, limit: Int): [PokeathlonStat]

    Pokemon(id: ID!): Pokemon
    Pokemons(skip: Int, limit: Int): [Pokemon]

    PokemonColor(id: ID!): PokemonColor
    PokemonColors(skip: Int, limit: Int): [PokemonColor]

    PokemonForm(id: ID!): PokemonForm
    PokemonForms(skip: Int, limit: Int): [PokemonForm]

    PokemonHabitat(id: ID!): PokemonHabitat
    PokemonHabitats(skip: Int, limit: Int): [PokemonHabitat]

    PokemonShape(id: ID!): PokemonShape
    PokemonShapes(skip: Int, limit: Int): [PokemonShape]

    PokemonSpecies(id: ID!): PokemonSpecies
    PokemonSpeciess(skip: Int, limit: Int): [PokemonSpecies]

    Stat(id: ID!): Stat
    Stats(skip: Int, limit: Int): [Stat]

    Type(id: ID!): Type
    Types(skip: Int, limit: Int): [Type]

    Language(id: ID!): Language
    Languages(skip: Int, limit: Int): [Language]
  }

  schema {
    query:Query
  }
`;
