const models = require('../../models')

module.exports = {
  ContestCombo: {
    normal: {
      use_before: models.move.getMoves,
      use_after: models.move.getMoves,
    },
    super: {
      use_before: models.move.getMoves,
      use_after: models.move.getMoves,
    },
  },
  MoveMeta: {
    ailment: models.moveAilment.getMoveAilment,
    category: models.moveCategory.getMoveCategory,
  },
  MovePastValue: {
    type: models.type.getType,
    version_group: models.versionGroup.getVersionGroup,
  },
  MoveStatChange: {
    stat: models.stat.getStat,
  },
  Move: {
    contest_type: models.contestType.getContestType,
    contest_effect: models.contestEffect.getContestEffect,
    damage_class: models.moveDamageClass.getMoveDamageClass,
    generation: models.generation.getGeneration,
    super_contest_effect: models.superContestEffect.getSuperContestEffect,
    target: models.moveTarget.getMoveTarget,
    type: models.type.getType,
  },

  MoveAilment: {
    moves: models.move.getMoves,
  },

  MoveCategory: {
    moves: models.move.getMoves,
  },

  MoveDamageClass: {
    moves: models.move.getMoves,
  },

  MoveLearnMethod: {
    version_groups: models.versionGroup.getVersionGroups,
  },

  MoveTarget: {
    moves: models.move.getMoves,
  }
}
