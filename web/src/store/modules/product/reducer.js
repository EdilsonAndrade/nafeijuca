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
  monday: null,
  tuesday: null,
  wednesday: null,
  thursday: null,
  friday: null,
  saturday: null,
  sunday: null,
  imageId: null,
  productGroupId: null,
  storeId: null,
  createdAt: null,
  updatedAt: null,
  ProductGroup: null,
  Store: null,
  products: [],
  SubItems: [],
};

export default function product(state = INITIAL_DATA, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@product/EDIT_SUCCESS': {
        if (!action.payload) {
          return INITIAL_DATA;
        }
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
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday,
          imageId,
          productGroupId,
          storeId,
          createdAt,
          updatedAt,
          Store,
          SubItems,
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
        draft.monday = monday;
        draft.tuesday = tuesday;
        draft.wednesday = wednesday;
        draft.thursday = thursday;
        draft.friday = friday;
        draft.saturday = saturday;
        draft.sunday = sunday;
        draft.imageId = imageId;
        draft.productGroupId = productGroupId;
        draft.storeId = storeId;
        draft.createdAt = createdAt;
        draft.updatedAt = updatedAt;
        draft.Store = Store;
        draft.SubItems = SubItems;
        break;
      }
      case '@product/LOAD_SUCCESS': {
        draft.products = action.payload;
        break;
      }
      default:
        break;
    }
  });
}
