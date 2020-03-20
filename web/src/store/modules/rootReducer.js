import { combineReducers } from 'redux';
import user from './user/reducer';
import load from './load/reducer';

export default combineReducers({
  user,
  load,
});
