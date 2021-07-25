import * as models from "../../models";

export default {
  Machine: {
    item: models.item.getItem,
    move: models.move.getMove,
    version_group: models.versionGroup.getVersionGroup,
  },
};
