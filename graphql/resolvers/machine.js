const models = require('../../models')

module.exports = {
    Machine: {
      item: models.item.getItem,
      move: models.move.getMove,
      version_group: models.versionGroup.getVersionGroup,
    },


}
