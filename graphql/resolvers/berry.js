const models = require('../../models')

module.exports = {
  Berry: {
    firmness: models.berryFirmness.getBerryFirmness,
    item: models.item.getItem,
    natural_gift_type: models.type.getType,
  },
  BerryFlavorPotency: {
    flavor: models.berryFlavor.getBerryFlavor
  },



  BerryFirmness: {
    berries: models.berry.getBerries,
    // names: [Name]
  },



  BerryFlavor: {
    contest_type: models.contestType.getContestType,
    // names: [Name],
  },
  FlavorBerry: {
    berry: models.berry.getBerry,
  },
}
