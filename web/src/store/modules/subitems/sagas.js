import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import * as ProductActions from '../product/actions';
import * as GroupActions from '../productGroup/actions';

function* saveSubItem({ payload }) {
  const { productId } = payload;
  try {
    if (!payload.SubItem.id) {
      yield call(api.post, `/products/${productId}/subitems`, payload);
      toast.success('Complemento cadastrado com sucesso');
    } else {
      yield call(api.put, `/subitems/${payload.SubItem.id}`, payload);
      toast.success('Complemento atualizado com sucesso');
    }
  } catch (error) {
    toast.error(JSON.stringify(error));
  }
  yield put(GroupActions.loadRequest(payload.storeId));
  yield put(ProductActions.editRequest(productId));
}

function* deleteSubItem({ payload }) {
  console.tron.warn(JSON.stringify(payload));
  const { ProductId } = payload.ProductsItems;

  toast.success('Sub item excluido com sucesso!');
  yield call(api.delete, `/subitems/${payload.id}`);
  yield put(ProductActions.editRequest(ProductId));
  yield put(GroupActions.loadRequest(payload.storeId));
}

export default all([
  takeLatest('@subitem/SAVE_REQUEST', saveSubItem),
  takeLatest('@subitem/DELETE_REQUEST', deleteSubItem),
]);
