import { YellowBox } from 'react-native';
import {all, takeLatest, put, call} from 'redux-saga/effects';
import api from '../../../services/api';
import {loginSuccess} from './actions';
function* loginUser({payload}) {
    const { token } = payload;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    
    yield put(loginSuccess({...payload, token}));

}
export function setToken({ payload }) {
  console.log(payload, 'paylooooadd')
  if (!payload) return;

  const { token } = payload;
  api.defaults.headers.Authorization = `Bearer ${token}`;
}
export default all(
[
takeLatest('@user/LOGIN_REQUEST', loginUser),
takeLatest('persist/REHYDRATE', setToken)
]);

