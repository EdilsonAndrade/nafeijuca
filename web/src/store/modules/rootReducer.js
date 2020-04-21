import { combineReducers } from 'redux';
import user from './user/reducer';
import load from './load/reducer';
import productGroup from './productGroup/reducer';
import product from './product/reducer';
import store from './store/reducer';
import subitem from './subitems/reducer';
import client from './client/reducer';

export default combineReducers({
  user,
  load,
  productGroup,
  product,
  store,
  subitem,
  client,
});
