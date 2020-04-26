import { produce } from 'immer';

const INITIAL_DATA = {
  latitude: null,
  longitude: null,
};

export default function user(state = INITIAL_DATA, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@user/SET_LOCATION_SUCCESS': {
        const { latitude, longitude } = action.payload;
        draft.latitude = latitude;
        draft.longitude = longitude;
        break;
      }
      default:
        break;
    }
  });
}
