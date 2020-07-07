import produce from 'immer';

const INITIAL_DATA = {
  totalItems: null,
  totalPrice: null,
  products: [],
  emptyCar: true,
};

export default function cart(state = INITIAL_DATA, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@cart/ADD_SUCCESS': {
        const { totalItems, totalPrice, product } = action.payload;

        draft.totalItems = totalItems || 1;
        draft.totalPrice = totalPrice;
        const existProduct = draft.products.findIndex((x) => x.id === product.id);
        if (existProduct >= 0) {
          draft.products[existProduct] = product;
        } else {
          draft.products.push(product);
        }
        draft.emptyCar = false;
        break;
      }
      case '@cart/ADD_SUCCESS_ORDER': {
        const products = draft.products.map((p) => ({
          ...p,
          subTotal: p.subTotal + (p.subTotal / p.quantity),
          quantity: p.quantity + 1,

        }));
        draft.totalItems += 1;
        const arrSubTotals = products.map((p) => p.subTotal);

        const totalPrice = arrSubTotals.reduce((total, p) => total + p);
        draft.totalPrice = totalPrice;
        draft.products = products;
        draft.emptyCar = false;
        break;
      }
      case '@cart/REMOVE_SUCCESS_ORDER': {
        const products = draft.products.map((p) => ({
          ...p,
          subTotal: p.subTotal - (p.subTotal / p.quantity),
          quantity: p.quantity - 1,
        }));
        draft.totalItems -= 1;
        const arrSubTotals = products.map((p) => p.subTotal);
        const totalPrice = arrSubTotals.reduce((total, p) => total + p);
        draft.emptyCar = false;
        draft.totalPrice = totalPrice;
        draft.products = products;
        break;
      }
      case '@cart/REMOVE_CART_SUCCESS': {
        const products = draft.products.filter((x) => x.id !== action.payload);


        if (products.length > 0) {
          draft.totalItems -= 1;
          const arrSubTotals = products.map((p) => p.subTotal);
          const totalPrice = arrSubTotals.reduce((total, p) => total + p);
          draft.totalPrice = totalPrice;
          draft.products = products;
          draft.emptyCar = false;
        } else {
          draft.emptyCar = true;
          draft.products = [];
          draft.totalPrice = 0;
          draft.totalItems = 0;
        }

        break;
      }
      case '@cart/EMPTY_SUCCESS': {
        return INITIAL_DATA;
      }
      default:
        break;
    }
  });
}
