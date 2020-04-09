import { all, put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { loadSuccess, editSuccess } from './actions';
import * as GroupActions from '../productGroup/actions';

function* saveProduct({ payload }) {
  try {
    const { id } = payload;
    if (!Number(id)) {
      console.tron.warn('vou salvar');
      yield call(api.post, '/products', payload);
      const products = yield call(
        api.get,
        `/stores/${payload.storeId}/products`
      );
      toast.success('Produto salvo com sucesso');
      yield put(GroupActions.loadRequest(payload.storeId));
      yield put(editSuccess(payload));
      yield put(loadSuccess(products.data));
    } else {
      yield call(api.put, `/products/${id}`, payload);

      const products = yield call(
        api.get,
        `/stores/${payload.storeId}/products`
      );
      toast.success('Produto atualizado com sucesso');
      yield put(GroupActions.loadRequest(payload.storeId));
      yield put(editSuccess(payload));
      yield put(loadSuccess(products.data));
    }
  } catch (err) {
    const { response } = err;
    if (response) {
      const { error } = response.data;
      if (error.includes('already')) {
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
function* getProducts({ payload }) {
  try {
    const response = yield call(api.get, `/stores/${payload}/products`);
    yield put(loadSuccess(response.data));
  } catch (err) {
    toast.error(err);
  }
}
export default all([
  takeLatest('@product/SAVE_REQUEST', saveProduct),
  takeLatest('@product/LOAD_REQUEST', getProducts),
]);
