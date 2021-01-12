import { produce } from 'immer';

const INITIAL_DATA = {
  latitude: null,
  longitude: null,
  address: null,
  name:null,
  id:null,
  email:null,
};

export default function user(state = INITIAL_DATA, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@user/SET_LOCATION_SUCCESS': {
        const { latitude, longitude, address } = action.payload;
        draft.latitude = latitude;
        draft.longitude = longitude;
        draft.address = address;
        break;
      }
      case '@user/SET_LOCATION_SUCCESS': {
        const { id, name, email, confirmed } = action.payload;
        draft.id = id;
        draft.name = name;
        draft.email = email;
        draft.confirmed= confirmed;
      }
      default:
        break;
    }
  });
}
