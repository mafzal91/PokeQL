import * as models from "../../models/index.js";

export default {
  Item: {
    attributes: models.itemAttribute.getItemAttributes,
    baby_trigger_for: models.evolutionChain.getEvolutionChain,
    category: models.itemCategory.getItemCategory,
    fling_effect: models.itemFlingEffect.getItemFlingEffect,
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
  ItemHolderPokemon: {
    pokemon: models.pokemon.getPokemon, // version_details: [ItemHolderPokemonVersionDetail],
  },
  ItemHolderPokemonVersionDetail: {
    version: models.version.getVersion,
  },
  ItemPocket: {
    categories: models.itemCategory.getItemCategories,
  },
  ItemSprites: {},
};
