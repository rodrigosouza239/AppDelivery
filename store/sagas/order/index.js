import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../../services/api';
import { showToast } from '../../../utils/toast';
import * as RootNavigation from '../../../services/navigation';

import {
  Creators as OrderActions,
  Types as OrderTypes,
} from '../../ducks/order';

import {
  Creators as CartActions,
  Types as CartTypes,
} from '../../ducks/cart';

function* addItem(payload) {
  try {
    const { data: cart, status } = yield call(
      api.post,
      '/cart',
      payload,
    );
    if (status === 200) {
      return cart.id;
    }
  } catch (error) {
    return null;
  }
  return null;
}

function* createOrder({
  payload,
  addressId,
  paymentType,
  change,
  deliveryType,
}) {
  console.tron.log('create order payload', payload);
  try {
    const orderPayload = {
      variations: payload,
      address_id: addressId,
      delivery_type: deliveryType,
      ...(deliveryType === 'delivery' && {
        payment_type: paymentType,
      }),
      ...(paymentType === 'money' && change && { money: change }),
    };
    const { data: order, status } = yield call(
      api.post,
      '/orders',
      orderPayload,
    );
    if (status === 200) {
      yield put(OrderActions.createOrderSuccess({ order }));
      yield put(CartActions.clearCart());

      RootNavigation.navigate('Home');
      RootNavigation.navigate('Orders', {
        screen: 'OrderStatus',
        options: {
          id: order?.order?.id,
          order_status: order?.order?.order_status,
        },
      });
    } else {
      yield put(OrderActions.createOrderFail());
      showToast(
        'Ops',
        'Houve um problema ao realizar pedido, tente novamente',
        'danger',
      );
    }
  } catch (error) {
    yield put(OrderActions.createOrderFail());
    showToast(
      'Ops',
      'Houve um problema ao realizar pedido, tente novamente',
      'danger',
    );
  }
}

function* getOrders(payload) {
  try {
    const response = yield call(
      api.get,
      `/orders?order_status=${payload.payload.filters}`,
    );
    if (response.status === 200) {
      yield put(OrderActions.getOrdersSuccess(response.data.data));
    } else {
      yield put(OrderActions.getOrdersFail());
      showToast('Erro', '', 'danger');
    }
  } catch (error) {
    yield put(OrderActions.getOrdersFail());
    showToast('Erro', '', 'danger');
  }
}

function* getOrderById({ payload }) {
  try {
    const response = yield call(api.get, `/orders/${payload}`);
    if (response.status === 200) {
      yield put(OrderActions.getOrderByIdSuccess(response.data));
    } else {
      yield put(OrderActions.getOrderByIdFail());
      showToast('Erro', 'Erro ao obter dados do pedido.', 'danger');
    }
  } catch (error) {
    yield put(OrderActions.getOrderByIdFail());
    showToast('Erro', 'Erro ao obter dados do pedido.', 'danger');
  }
}

function* createOrderWatcher() {
  yield takeLatest(OrderTypes.CREATE_ORDER, createOrder);
}

function* getOrdersWatcher() {
  yield takeLatest(OrderTypes.GET_ORDERS, getOrders);
}

function* getOrderByIdWatcher() {
  yield takeLatest(OrderTypes.GET_ORDER_BY_ID, getOrderById);
}

export default function* rootSaga() {
  yield all([
    fork(createOrderWatcher),
    fork(getOrdersWatcher),
    fork(getOrderByIdWatcher),
  ]);
}
