import { combineReducers } from 'redux';
import productGroup from './productGroup/reducer';
import product from './product/reducer';
import store from './store/reducer';
import user from './user/reducer';
import cart from './cart/reducer';

export default combineReducers({
  productGroup,
  product,
  store,
  user,
  cart,
});
