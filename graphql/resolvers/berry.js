import * as models from "../../models/index.js";

export default {
  Berry: {
    firmness: models.berryFirmness.getBerryFirmness,
    // firmness: () => console.log("oyolol"),
    item: models.item.getItem,
    natural_gift_type: models.type.getType,
  },
  BerryFirmness: {
    berries: models.berry.getBerries,
  },
  BerryFlavor: {
    contest_type: models.contestType.getContestType,
  },
  BerryFlavorPotency: {
    flavor: models.berryFlavor.getBerryFlavor,
  },
  FlavorBerry: {
    berry: models.berry.getBerry,
  },
};
