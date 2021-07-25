import * as models from "../../models/index.js";

export default {
  ContestEffect: {
    // effect_entries: [Effect]
    // flavor_text_entries: [FlavorText]
  },
  ContestType: {
    berry_flavor: models.berryFlavor.getBerryFlavor,
  },
  SuperContestEffect: {
    // flavor_text_entries: FlavorText
    moves: models.move.getMoves,
  },
};
