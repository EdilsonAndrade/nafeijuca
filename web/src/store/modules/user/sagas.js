import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { saveSuccess, loadSuccess } from './actions';

export function* deleteUser({ payload }) {
  yield call(api.delete, `/users/${payload.id}`);
  toast.success('Usuário excluido com sucesso');
  const { store } = payload;
  let users = [];
  if (payload.systemAdmin) {
    users = yield call(api.get, '/users');
  } else {
    users = yield call(api.get, `/users/${store.id}`);
  }

  yield put(loadSuccess(users.data));
}

export function* saveUpdateUser({ payload }) {
  const {
    id,
    isUserAdmin,
    email,
    isAdmin,
    avatarUrl,
    avatarId,
    systemAdmin,
  } = payload;

  if (!id) {
    yield call(api.post, '/users', {
      ...payload,
      avatarId: avatarUrl,
    });
    toast.success('Usuário criado com sucesso');
  } else {
    const datatoUpdate = {
      ...payload,
      avatarId: avatarUrl || avatarId,
      isUserAdmin,
      isAdmin,
      oldEmail: email,
    };
    yield call(api.put, `/users/${id}`, datatoUpdate);
    toast.success('Usuário atualizado com sucesso');
  }
  let users = [];
  if (systemAdmin) {
    users = yield call(api.get, '/users');
  } else {
    users = yield call(api.get, `/users/${payload.storeId}`);
  }
  yield put(loadSuccess(users.data));
}
export default all([
  takeLatest('@user/SAVE_REQUEST', saveUpdateUser),
  takeLatest('@user/DELETE_REQUEST', deleteUser),
]);
