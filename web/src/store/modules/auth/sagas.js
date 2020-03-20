import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { signinSuccess } from './actions';
import history from '~/services/history';
import { loadStart, loadStop } from '../load/actions';

function* requestSignin({ payload }) {
  yield put(loadStart());

  const { email, password } = payload;
  if (email && password) {
    try {
      const response = yield call(api.post, '/sessions', {
        email,
        password,
      });

      const { token, user } = response.data;
      if (!token) {
        toast.error('Usuário inválido');
        return;
      }
      if (!user) {
        toast.error('Usuário não encontrado');
      }
      api.defaults.headers.Authorization = `Bearer ${token}`;
      yield put(signinSuccess({ token, user }));
      yield put(loadStop());
      history.push('/dashboard');
    } catch ({ response }) {
      yield put(loadStop());
      const { error } = response.data;
      if (error) {
        toast.error(error);
      } else {
        toast.error('Ocorreu um erro no sistema, tente novamente');
      }
    }
  }
}
export default all([takeLatest('@auth/REQUEST_SIGNIN', requestSignin)]);
