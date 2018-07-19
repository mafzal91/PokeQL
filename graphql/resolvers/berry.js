const models = require('../../models')

module.exports = {
  Berry: {
    firmness: models.berryFirmness.getBerryFirmness,
    // firmness: () => console.log("oyolol"),
    item: models.item.getItem,
    natural_gift_type: models.type.getType,
  },
  BerryFlavorPotency: {
    flavor: models.berryFlavor.getBerryFlavor
  },



  BerryFirmness: {
    berries: models.berry.getBerries,
  },



  BerryFlavor: {
    contest_type: models.contestType.getContestType,
  },
  FlavorBerry: {
    berry: models.berry.getBerry,
  },
}
