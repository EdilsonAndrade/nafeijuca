import {all, takeLatest, put, call} from 'redux-saga/effects';
import api from '../../../services/api';
import {loadSuccess} from './actions';

function* loadRequest({payload}) {
  try {
    const response = yield call(api.get, `/stores/${payload}/productgroups`);
    yield put(loadSuccess(response.data));
  } catch (err) {
    const {response} = err;
    if (response) {
      const {error} = response.data;

      //toast.error(error);
    } else {
      // toast.error('Ocorreu um erro no servidor, tenta mais tarde');
      // toast.error(err);
    }
  }
}
export default all([takeLatest('@productGroup/LOAD_REQUEST', loadRequest)]);
