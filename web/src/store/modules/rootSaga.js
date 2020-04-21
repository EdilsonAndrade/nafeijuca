import { all } from 'redux-saga/effects';
import auth from './auth/sagas';
import user from './user/sagas';
import productGroup from './productGroup/sagas';
import product from './product/sagas';
import subitem from './subitems/sagas';
import client from './client/sagas';

export default function* rootSaga() {
  return yield all([auth, user, productGroup, product, subitem, client]);
}
