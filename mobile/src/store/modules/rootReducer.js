import { combineReducers } from 'redux';
import productGroup from './productGroup/reducer';
import product from './product/reducer';
import store from './store/reducer';
import user from './user/reducer';

export default combineReducers({
  productGroup,
  product,
  store,
  user,
});
