import {
  all,
  call,
  fork,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';
import api from '../../../services/api';
import { showToast } from '../../../utils/toast';

import {
  Creators as ReviewActions,
  Types as ReviewTypes,
} from '../../ducks/review';
import { Creators as OrderActions } from '../../ducks/order';

function* addReview({ payload }) {
  try {
    const response = yield call(api.post, '/reviews', payload);
    if (response.status === 200) {
      const { orders } = yield select(state => state.order);
      const find = orders?.find(e => e.id === payload.order_id);
      if (find) {
        find.review = response.data;
        yield put(OrderActions.addItem({ orders }));
      }
      yield put(ReviewActions.addReviewSuccess());
      showToast(
        'Sucesso',
        'O pedido foi avaliado com sucesso.',
        'success',
      );
    } else {
      yield put(ReviewActions.addReviewFail());
      showToast(
        'Erro',
        'Ocorreu um erro ao efetuar avaliação do pedido. Tente novamente mais tarde.',
        'danger',
      );
    }
  } catch (error) {
    yield put(ReviewActions.addReviewFail());
    showToast(
      'Erro',
      'Ocorreu um erro ao efetuar avaliação do pedido. Tente novamente mais tarde.',
      'danger',
    );
  }
}

function* addReviewWatcher() {
  yield takeLatest(ReviewTypes.ADD_REVIEW, addReview);
}

export default function* rootSaga() {
  yield all([fork(addReviewWatcher)]);
}
