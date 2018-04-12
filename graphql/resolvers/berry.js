const models = require('../../models')

module.exports = {
  Berry: {
    firmness: models.type.getItem,
    flavors: [BerryFlavorPotency]
    item: models.type.getItem,
    natural_gift_type: models.type.getType,
  }



  BerryFlavorPotency: {
    flavor: models.berryFlavor.getFlavor
  }



  BerryFirmness: {
    berries: [Berry]
    names: [Name]
  }



  BerryFlavor: {
    berries: FlavorBerry
    contest_type: models.contestType.getContestType
    names: [Name]
  }



  FlavorBerry: {
    berry: models.berryFlavor.getBerry
  }



}
