import produce from 'immer';

const INITIAL_DATA = {
  totalItems: null,
  totalPrice: null,
  products: [],
};

export default function cart(state = INITIAL_DATA, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@cart/ADD_SUCCESS': {
        const { totalItems, totalPrice, product } = action.payload;
        draft.totalItems = totalItems;
        draft.totalPrice = totalPrice;
        draft.products.push(product);
        break;
      }
      case '@cart/REMOVE_SUCCESS': {
        return INITIAL_DATA;
      }
      default:
        break;
    }
  });
}
