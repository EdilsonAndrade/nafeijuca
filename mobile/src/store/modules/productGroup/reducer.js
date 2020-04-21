import {produce} from 'immer';

const INITIAL_DATA = {
  id: null,
  name: null,
  description: null,
  star: null,
  discount: null,
  active: null,
  expiration: null,
  quantityTotal: null,
  considerQuantity: false,
  createdAt: null,
  updatedAt: null,
  storeId: null,
  store: null,
  productGroups: [],
};

export default function productGroup(state = INITIAL_DATA, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@productGroup/LOAD_SUCCESS': {
        draft.productGroups = action.payload;
        break;
      }
      default:
    }
  });
}
