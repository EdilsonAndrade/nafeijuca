import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { saveSuccess, loadSuccess } from './actions';

export function* deleteUser({ payload }) {
  yield call(api.delete, `/users/${payload}`);
  toast.success('Usuário excluido com sucesso');
  const users = yield call(api.get, '/users');
  yield put(loadSuccess(users.data));
}

export function* saveUpdateUser({ payload }) {
  const { id, isUserAdmin, email, isAdmin, avatarUrl, avatarId } = payload;
  let response = null;

  if (!id) {
    response = yield call(api.post, '/users', {
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
    response = yield call(api.put, `/users/${id}`, datatoUpdate);
    toast.success('Usuário atualizado com sucesso');
  }
  const users = yield call(api.get, '/users');
  yield put(loadSuccess(users.data));
}
export default all([
  takeLatest('@user/SAVE_REQUEST', saveUpdateUser),
  takeLatest('@user/DELETE_REQUEST', deleteUser),
]);
