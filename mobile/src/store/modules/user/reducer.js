import { produce } from 'immer';

const INITIAL_DATA = {
  latitude: null,
  longitude: null,
  address: null,
};

export default function user(state = INITIAL_DATA, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@user/SET_LOCATION_SUCCESS': {
        const { latitude, longitude, address } = action.payload;
        draft.latitude = latitude;
        draft.longitude = longitude;
        draft.address = address;
        console.log(address);
        break;
      }
      default:
        break;
    }
  });
}
