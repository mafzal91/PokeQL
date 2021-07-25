import * as models from "../../models/index.js";

export default {
  ContestCombo: {
    normal: {
      use_after: models.move.getMoves,
      use_before: models.move.getMoves,
    },
    super: {
      use_after: models.move.getMoves,
      use_before: models.move.getMoves,
    },
  },
  Move: {
    contest_effect: models.contestEffect.getContestEffect,
    contest_type: models.contestType.getContestType,
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
  MoveTarget: {
    moves: models.move.getMoves,
  },
};
