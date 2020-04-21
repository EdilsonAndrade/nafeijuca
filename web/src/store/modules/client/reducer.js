import { produce } from 'immer';

const INITIAL_STATE = {
  id: null,
  name: null,
  email: null,
  phone: null,
  Address: null,
  clients: [],
};

export default function client(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@client/EDIT_SUCCESS': {
        const { id, name, email, phone, Address } = action.payload;
        draft.id = id;
        draft.name = name;
        draft.email = email;
        draft.phone = phone;
        draft.Address = Address;
        break;
      }

      case '@client/LOAD_SUCCESS': {
        draft.clients = action.payload;
        break;
      }
      case '@client/REQUEST_NEW_CLIENT': {
        return INITIAL_STATE;
      }
      default:
        break;
    }
  });
}
