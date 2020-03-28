import { produce } from 'immer';

const INITIAL_STATE = {
  id: null,
  name: null,
  gender: null,
  birthDate: null,
  email: null,
  confirmed: null,
  expiration: null,
  createdAt: null,
  updatedAt: null,
  isAdmin: false,
  storeId: null,
  avatarId: null,
  clientId: null,
  signed: false,
  token: null,
  users: [],
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@user/LOAD_SUCCESS': {
        draft.users = action.payload;
        break;
      }
      case '@user/SAVE_SUCCESS': {
        draft.users.push(action.payload.user);
        break;
      }
      case '@user/SIGNOUT_SUCCESS': {
        draft.signed = false;
        draft.token = null;
        draft.isAdmin = false;
        break;
      }
      case '@user/SIGNIN_SUCCESS': {
        const {
          id,
          name,
          gender,
          birthDate,
          email,
          confirmed,
          expiration,
          createdAt,
          updatedAt,
          isAdmin,
          storeId,
          avatarId,
          clientId,
        } = action.payload.user;
        const { token } = action.payload;
        draft.id = id;
        draft.name = name;
        draft.gender = gender;
        draft.birthDate = birthDate;
        draft.email = email;
        draft.confirmed = confirmed;
        draft.expiration = expiration;
        draft.createdAt = createdAt;
        draft.updatedAt = updatedAt;
        draft.isAdmin = isAdmin;
        draft.storeId = storeId;
        draft.avatarId = avatarId;
        draft.clientId = clientId;
        draft.signed = true;
        draft.token = token;
        break;
      }
      default:
    }
  });
}
