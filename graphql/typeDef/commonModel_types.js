export default `
  type Description {
    description: String!
    language: Language!
  }
  type Effect {
    effect: String!
    language: Language!
  }
  type Encounter {
    min_level: Int!
    max_level: Int!
    condition_values: [EncounterConditionValue]
    chance: Int!
    method: EncounterMethod!
  }
  type FlavorText {
    flavor_text: String!
    language: Language!
  }
  type FlavorText1 {
    flavor_text: String!
    language: Language!
    version_group: VersionGroup!
  }
  type VersionFlavorText {
    flavor_text: String!
    language: Language!
    version: Version!
  }
  type GenerationGameIndex {
    game_index: Int!
    generation: Generation!
  }
  type MachineVersionDetail {
    machine: Machine!
    version_group: VersionGroup!
  }
  type Name {
    name: String!
    language: Language!
  }
  type VerboseEffect {
    effect: String!
    short_effect: String!
    language: Language!
  }
  type VersionEncounterDetail {
    version: Version!,
    max_chance: Int!
    encounter_details: [Encounter]
  }
  type VersionGameIndex {
    game_index: Int!
    version: Version!
  }
  type VersionGroupFlavorText {
    text: String!
    language: Language!
    version_group: VersionGroup!
  }
`;
