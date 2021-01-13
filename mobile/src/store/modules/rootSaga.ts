import { all } from 'redux-saga/effects';
import productGroup from './productGroup/sagas';
import product from './product/sagas';
import cart from './cart/sagas';
import user from './user/sagas';

export default function* rootSaga() {
  return yield all([productGroup, product, cart, user]);
}
