import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import * as ProductActions from '../product/actions';
import * as GroupActions from '../productGroup/actions';

function* saveSubItem({ payload }) {
  const { id, productId } = payload;
  if (!id) {
    yield call(api.post, `/product/${productId}`, payload);
    toast.success('Complemento cadastrado com sucesso');
    yield put(GroupActions.loadRequest(payload.storeId));
    yield put(ProductActions.loadRequest(payload.storeId));
  } else {
    yield call(api.post, `/subitems/${id}`, payload);
    toast.success('Complemento cadastrado com sucesso');
    yield put(GroupActions.loadRequest(payload.storeId));
    yield put(ProductActions.loadRequest(payload.storeId));
  }
}

export default all([takeLatest('@subitem/SAVE_REQQUEST', saveSubItem)]);
