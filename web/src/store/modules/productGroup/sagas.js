import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { loadSuccess } from './actions';

function* saveProductGroup({ payload }) {
  const { id, storeId } = payload;
  if (!id) {
    yield call(api.post, `/stores/${storeId}/productgroups`, payload);
    toast.success('Grupo  criado com sucesso');
  }
  const response = yield call(api.get, `/stores/${storeId}/productgroups`);
  yield put(loadSuccess(response.data));
}
export default all([
  takeLatest('@productGroup/SAVE_REQUEST', saveProductGroup),
]);
