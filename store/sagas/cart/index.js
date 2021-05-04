import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { showToast } from '../../../utils/toast';

import {
  Creators as CartActions,
  Types as CartTypes,
} from '../../ducks/cart';

export default function* rootSaga() {
  yield all([]);
}
