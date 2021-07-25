import * as models from "../../models";

export default {
  EncounterMethod: {},

  EncounterCondition: {
    values: models.encounterConditionValue.getEncounterConditionValues,
  },

  EncounterConditionValue: {
    condition: models.encounterCondition.getEncounterCondition,
  },
};
