import * as models from "../../models";

export default {
  ItemHolderPokemonVersionDetail: {
    version: models.version.getVersion,
  },
  ItemHolderPokemon: {
    pokemon: models.pokemon.getPokemon,
    // version_details: [ItemHolderPokemonVersionDetail],
  },
  ItemSprites: {},
  Item: {
    fling_effect: models.itemFlingEffect.getItemFlingEffect,
    attributes: models.itemAttribute.getItemAttributes,
    category: models.itemCategory.getItemCategory,
    baby_trigger_for: models.evolutionChain.getEvolutionChain,
  },

  ItemAttribute: {
    items: models.item.getItems,
  },

  ItemCategory: {
    items: models.item.getItems,
    pocket: models.itemPocket.getItemPocket,
  },

  ItemFlingEffect: {
    items: models.item.getItems,
  },

  ItemPocket: {
    categories: models.itemCategory.getItemCategories,
  },
};
