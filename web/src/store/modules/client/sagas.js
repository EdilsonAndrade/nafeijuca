import { all, takeLatest, put, call } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';
import { loadRequest, loadSuccess } from './actions';
import { signout } from '~/store/modules/auth/actions';

export function* saveRequest({ payload }) {
  try {
    const { id, storeId, Address } = payload;

    if (storeId) {
      if (!id) {
        yield call(api.post, '/clients/', { ...payload, myAddress: Address });
        toast.success('Cliente cadastrado com sucesso');
      } else {
        yield call(api.put, `/clients/${id}`, {
          ...payload,
          myAddress: Address,
        });
        toast.success('Cliente atualizado com sucesso');
      }
      yield put(loadRequest(storeId));
    } else {
      toast.error('Loja não selecionada para cadastro do cliente|');
    }
  } catch (err) {
    const { response } = err;
    if (response) {
      const { error } = response.data;
      if (error.includes('already')) {
        toast.error('Cliente com e-mail já existe');
      } else {
        toast.error(error);
      }
    } else {
      toast.error('Ocorreu um erro no servidor, tenta mais tarde');
      toast.error(err);
    }
  }
}

export function* load({ payload }) {
  try {
    const response = yield call(api.get, `/stores/${payload}/clients`);
    yield put(loadSuccess(response.data));
  } catch (error) {
    yield put(signout());
    history.push('/');
  }
}

export default all([
  takeLatest('@client/SAVE_REQUEST', saveRequest),
  takeLatest('@client/LOAD_REQUEST', load),
]);
