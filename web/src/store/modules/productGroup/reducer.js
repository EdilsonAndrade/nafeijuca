import { produce } from 'immer';

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
  return produce(state, draft => {
    switch (action.type) {
      case '@productGroup/EDIT_SUCCESS': {
        if (!action.payload) {
          return INITIAL_DATA;
        }
        const {
          id,
          name,
          description,
          star,
          discount,
          active,
          expiration,
          quantityTotal,
          considerQuantity,
          createdAt,
          updatedAt,
          storeId,
          Store,
        } = action.payload;
        draft.id = id;
        draft.name = name;
        draft.description = description;
        draft.star = star;
        draft.discount = discount;
        draft.active = active;
        draft.expiration = expiration;
        draft.quantityTotal = quantityTotal;
        draft.considerQuantity = considerQuantity;
        draft.createdAt = createdAt;
        draft.updatedAt = updatedAt;
        draft.storeId = storeId;
        draft.store = Store;

        break;
      }
      case '@productGroup/LOAD_SUCCESS': {
        draft.productGroups = action.payload;
        break;
      }
      default:
    }
  });
}
