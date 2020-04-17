import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { loadSuccess, editSuccess } from './actions';
import { signoutRequesst } from '~/store/modules/auth/actions';

function* saveProductGroup({ payload }) {
  const { id, storeId } = payload;
  try {
    if (!id) {
      yield call(api.post, `/stores/${storeId}/productgroups`, payload);
      toast.success('Grupo  criado com sucesso');
    } else {
      const response = yield call(api.put, `/productgroups/${id}`, payload);
      toast.success('Grupo atualizado com sucesso');
      yield put(editSuccess(response.data));
    }
    const response = yield call(api.get, `/stores/${storeId}/productgroups`);
    yield put(loadSuccess(response.data));
  } catch (err) {
    const { response } = err;
    if (response) {
      const { error } = response.data;
      if (error && error.includes('already')) {
        toast.error('Produto já existe');
      } else {
        toast.error(error);
      }
    } else {
      toast.error('Ocorreu um erro no servidor, tenta mais tarde');
      toast.error(err);
    }
  }
}
function* loadRequest({ payload }) {
  try {
    const response = yield call(api.get, `/stores/${payload}/productgroups`);
    console.tron.warn({ response });
    yield put(loadSuccess(response.data));
  } catch (err) {
    const { response } = err;
    if (response) {
      const { error } = response.data;
      if (error.includes('already')) {
        toast.error('Produto já existe');
      } else {
        toast.error(error);
        yield put(signoutRequesst());
      }
    } else {
      toast.error('Ocorreu um erro no servidor, tenta mais tarde');
      toast.error(err);
    }
  }
}
export default all([
  takeLatest('@productGroup/SAVE_REQUEST', saveProductGroup),
  takeLatest('@productGroup/LOAD_REQUEST', loadRequest),
]);
