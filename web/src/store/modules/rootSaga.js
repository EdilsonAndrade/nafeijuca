import { all } from 'redux-saga/effects';
import auth from './auth/sagas';
import user from './user/sagas';
import productGroup from './productGroup/sagas';
import product from './product/sagas';

export default function* rootSaga() {
  return yield all([auth, user, productGroup, product]);
}
