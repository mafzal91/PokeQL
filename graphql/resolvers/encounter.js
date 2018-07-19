const models = require('../../models')

module.exports = {
  EncounterMethod: {
  },

  EncounterCondition: {
    values: models.encounterConditionValue.getEncounterConditionValues
  },

  EncounterConditionValue: {
    condition: models.encounterCondition.getEncounterCondition
  },
}
