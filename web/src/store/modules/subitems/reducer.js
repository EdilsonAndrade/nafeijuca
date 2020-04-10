import { produce } from 'immer';

const INITIAL_DATA = {
  id: null,
  name: null,
  detail: null,
  mandatory: null,
  min: null,
  max: null,
  active: null,
  quantity: null,
  price: null,
  createdAt: null,
  updatedAt: null,
  productId: null,
};

export default function subItem(state = INITIAL_DATA, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@subitem/SAVE_SUCCESS': {
        const {
          id,
          name,
          detail,
          mandatory,
          min,
          max,
          active,
          quantity,
          price,
          createdAt,
          updatedAt,
          productId,
        } = action.payload;

        draft.id = id;
        draft.name = name;
        draft.detail = detail;
        draft.mandatory = mandatory;
        draft.min = min;
        draft.max = max;
        draft.active = active;
        draft.quantity = quantity;
        draft.price = price;
        draft.createdAt = createdAt;
        draft.updatedAt = updatedAt;
        draft.productId = productId;

        break;
      }
      default:
        break;
    }
  });
}
