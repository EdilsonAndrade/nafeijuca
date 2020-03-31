import { produce } from 'immer';

const INITIAL_DATA = {
  id: null,
  name: null,
  address: null,
  number: null,
  addressLineTwo: null,
  neightborhood: null,
  zipcode: null,
  cnpj: null,
  active: false,
  stores: [],
};

export default function store(state = INITIAL_DATA, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@store/SAVE_SUCCESS': {
        const {
          name,
          address,
          number,
          addressLineTwo,
          neightborhood,
          zipcode,
          cnpj,
          active,
        } = action.payload;
        draft.name = name;
        draft.address = address;
        draft.number = number;
        draft.addressLineTwo = addressLineTwo;
        draft.neightborhood = neightborhood;
        draft.zipcode = zipcode;
        draft.cnpj = cnpj;
        draft.active = active;
        break;
      }
      case '@store/LOAD_SUCCESS': {
        draft.stores = action.payload;
        break;
      }

      default:
        break;
    }
  });
}
