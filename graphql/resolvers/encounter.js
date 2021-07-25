import * as models from "../../models/index.js";

export default {
  EncounterCondition: {
    values: models.encounterConditionValue.getEncounterConditionValues,
  },
  EncounterConditionValue: {
    condition: models.encounterCondition.getEncounterCondition,
  },
  EncounterMethod: {},
};
