import * as models from "../../models";

export default {
  Description: {
    language: models.language.getLanguage,
  },

  Effect: {
    language: models.language.getLanguage,
  },

  Encounter: {
    condition_values:
      models.encounterConditionValue.getEncounterConditionValues,
    method: models.encounterMethod.getEncounterMethod,
  },

  FlavorText: {
    language: models.language.getLanguage,
  },

  FlavorText1: {
    language: models.language.getLanguage,
    version_group: models.versionGroup.getVersionGroup,
  },

  VersionFlavorText: {
    language: models.language.getLanguage,
    version: models.version.getVersion,
  },

  GenerationGameIndex: {
    generation: models.generation.getGeneration,
  },

  MachineVersionDetail: {
    machine: models.machine.getMachine,
    version_group: models.versionGroup.getVersionGroup,
  },

  Name: {
    language: models.language.getLanguage,
  },

  VerboseEffect: {
    language: models.language.getLanguage,
  },

  VersionEncounterDetail: {
    version: models.version.getVersion,
  },

  VersionGameIndex: {
    version: models.version.getVersion,
  },

  VersionGroupFlavorText: {
    language: models.language.getLanguage,
    version_group: models.versionGroup.getVersionGroup,
  },
};
