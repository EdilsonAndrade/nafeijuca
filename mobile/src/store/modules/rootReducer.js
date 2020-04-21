import {combineReducers} from 'redux';
import productGroup from './productGroup/reducer';
import product from './product/reducer';

export default combineReducers({
  productGroup,
  product,
});
