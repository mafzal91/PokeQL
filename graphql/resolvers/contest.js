import * as models from "../../models";

export default {
  ContestType: {
    berry_flavor: models.berryFlavor.getBerryFlavor,
  },

  ContestEffect: {
    // effect_entries: [Effect]
    // flavor_text_entries: [FlavorText]
  },

  SuperContestEffect: {
    // flavor_text_entries: FlavorText
    moves: models.move.getMoves,
  },
};
