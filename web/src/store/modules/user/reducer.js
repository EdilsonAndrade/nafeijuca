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
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
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
        draft.ctlie = clientId;
        draft.signed = true;

        break;
      }
      default:
    }
  });
}
