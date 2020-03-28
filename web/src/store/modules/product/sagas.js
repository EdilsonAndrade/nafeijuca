import { all, put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import * as ProductActions from './actions';
import * as ProductGroupActions from '../productGroup/actions';

function* saveProduct({ payload }) {
  yield console.tron.warn(payload);
}

export default all([takeLatest('@product/SAVE_REQUEST', saveProduct)]);
