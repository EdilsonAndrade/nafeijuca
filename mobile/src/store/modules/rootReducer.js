import { combineReducers } from 'redux';
import productGroup from './productGroup/reducer';
import product from './product/reducer';
import store from './store/reducer';

export default combineReducers({
  productGroup,
  product,
  store,
});
