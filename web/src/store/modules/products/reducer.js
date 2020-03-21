import { produce } from 'immer';

const INITIAL_DATA = {
  id: null,
  name: null,
  description: null,
  equivalentAmount: null,
  quantity: null,
  price: null,
  promotionPrice: null,
  promotionExpire: null,
  active: null,
  weekdaysActive: null,
  imageId: null,
  productGroupId: null,
  storeId: null,
  createdAt: null,
  updatedAt: null,
};

export default function product(state = INITIAL_DATA, action) {
  return produce(state, draft => {
    switch (action.payload) {
      case '@product/SAVE_SUCCESS': {
        const {
          id,
          name,
          description,
          equivalentAmount,
          quantity,
          price,
          promotionPrice,
          promotionExpire,
          active,
          weekdaysActive,
          imageId,
          productGroupId,
          storeId,
          createdAt,
          updatedAt,
        } = action.payload;

        draft.id = id;
        draft.name = name;
        draft.description = description;
        draft.equivalentAmount = equivalentAmount;
        draft.quantity = quantity;
        draft.price = price;
        draft.promotionPrice = promotionPrice;
        draft.promotionExpire = promotionExpire;
        draft.active = active;
        draft.weekdaysActive = weekdaysActive;
        draft.imageId = imageId;
        draft.productGroupId = productGroupId;
        draft.storeId = storeId;
        draft.createdAt = createdAt;
        draft.updatedAt = updatedAt;

        break;
      }

      default:
        break;
    }
  });
}
