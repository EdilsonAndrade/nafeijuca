import { all, put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import * as ProductActions from './actions';

function* saveProduct({ payload }) {
  try {
    const response = yield call(api.post, '/products', payload);
    if (response.id) {
      toast.success('Produto salvo com sucesso');
      const products = yield call(
        api.get,
        `/stores/${payload.storeId}/products`
      );
      toast.success('Produto salvo com sucesso');
      yield put(ProductActions.loadSuccess(products.data));
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

export default all([takeLatest('@product/SAVE_REQUEST', saveProduct)]);
