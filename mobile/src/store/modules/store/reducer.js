import { produce } from 'immer';

const INITIAL_DATA = {
  id: null,
  name: null,
  address: null,
  addressLineTwo: null,
  zipcode: null,
  neighborhood: null,
  number: null,
  cnpj: null,
  active: null,
  latitude: null,
  longitude: null,
  city: null,
  avatarId: null,
};

export default function store(state = INITIAL_DATA, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@store/SELECT_STORE_SUCCESS': {
        const {
          id,
          name,
          address,
          addressLineTwo,
          zipcode,
          neighborhood,
          number,
          cnpj,
          active,
          latitude,
          longitude,
          city,
          avatarId,
        } = action.payload;

        draft.id = id;
        draft.name = name;
        draft.address = address;
        draft.addressLineTwo = addressLineTwo;
        draft.zipcode = zipcode;
        draft.neighborhood = neighborhood;
        draft.number = number;
        draft.cnpj = cnpj;
        draft.active = active;
        draft.latitude = latitude;
        draft.longitude = longitude;
        draft.city = city;
        draft.avatarId = avatarId;
        break;
      }

      default:
        break;
    }
  });
}
