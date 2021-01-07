import {
  all, takeLatest, put,
} from 'redux-saga/effects';
import * as CartActions from './action';


function* checkSupply({ payload }) {
  // this function in the future will check the backend store to see if have supplies
  // try {
  //   const response = yield call(api.get, `/stores/${payload}/productgroups`);
  //   yield put(loadSuccess(response.data));
  // } catch (err) {
  //   const {response} = err;
  //   if (response) {
  //     const {error} = response.data;

  //     //toast.error(error);
  //   } else {
  //     // toast.error('Ocorreu um erro no servidor, tenta mais tarde');
  //     // toast.error(err);
  //   }

  yield put(CartActions.addSuccessFromOrder());
}


export default all([takeLatest('@cart/ADD_REQUEST_ORDER', checkSupply)]);
