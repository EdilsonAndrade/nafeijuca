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
      case '@cart/ADD_TO_CART_SUCCESS': {
        const { totalPrice, product } = action.payload;

        draft.totalPrice = totalPrice;
        const existProduct = draft.products.findIndex((x) => x.id === product.id);
        const productExist = draft.products.find((x) => x.id === product.id);
        let sameSubItems = true;

        if (productExist && product.subItems && productExist.subItems && JSON.stringify(productExist.subItems) !== JSON.stringify(product.subItems)) {
          sameSubItems = false;
        }

        if (existProduct >= 0 && sameSubItems) {
          draft.products[existProduct] = product;
        } else {
          draft.products.push(product);
        }
        draft.totalItems = draft.products.length;
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
        const products = draft.products.filter((x) => x.key !== action.payload);
        if (products.length > 0) {
          draft.totalItems -= 1;
          let total = 0;
          for (let indiceProduct = 0; indiceProduct < products.length; indiceProduct += 1) {
            total += +products[indiceProduct].subTotal * +products[indiceProduct].quantity;
            for (let indiceSubItem = 0; indiceSubItem < products[indiceProduct].subItems.length; indiceSubItem += 1) {
              total += +products[indiceProduct].subItems[indiceSubItem].price * +products[indiceProduct].quantity;
            }
          }

          draft.totalPrice = total;
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
