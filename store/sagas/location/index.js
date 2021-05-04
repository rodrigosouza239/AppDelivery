import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { showToast } from '../../../utils/toast';
import * as RootNavigation from '../../../services/navigation';

import {
  Creators as LocationsActions,
  Types as LocationsTypes,
} from '../../ducks/locations';

function* allLocations() {
  try {
    const response = yield call(api.get, '/address');
    yield put(LocationsActions.getLocationsSuccess(response.data));
  } catch (error) {
    yield put(LocationsActions.getLocationsFail());
    showToast(
      'Ops',
      'Houve um problema ao buscar seu endereços',
      'danger',
    );
  }
}

function* calcShipment({ payload }) {
  try {
    const { status, data } = yield call(
      api.post,
      '/shipment',
      payload,
    );
    if (status === 200) {
      yield put(
        LocationsActions.calcShipmentSuccess({ shipment: data }),
      );
    } else {
      showToast(
        'Ops',
        'Houve um problema ao calcular valor de entregar',
        'danger',
      );
      yield put(LocationsActions.calcShipmentFail());
    }
  } catch (error) {
    alert(
      error?.response?.data?.message ||
        'Houve um problema ao calcular valor de entregar',
    );
    // showToast(
    //   'Ops',
    //   error?.response?.data?.message ||
    //     'Houve um problema ao calcular valor de entregar',
    //   'danger',
    // );
    yield put(LocationsActions.calcShipmentFail());
  }
}

function* addLocation({ payload }) {
  try {
    yield call(api.post, '/address', {
      ...payload,
    });
    yield put(LocationsActions.getLocations());
    RootNavigation.goBack();
  } catch (error) {
    yield put(LocationsActions.addLocationFail());
    showToast(
      'Ops',
      'Não foi possível adicionar seu endereço, tente novamente',
      'danger',
    );
  }
}

function* removeLocation({ payload }) {
  try {
    yield call(api.delete, `/address/${payload}`);
    yield put(LocationsActions.getLocations());
    showToast('Pronto', 'Seu endereço foi removido', 'success');
  } catch (error) {
    showToast(
      'Ops',
      'Não foi possível adicionar seu endereço, tente novamente',
      'danger',
    );
  }
}

function* updateLocation({ payload, navigateBackTo }) {
  console.tron.log('update location: ', payload, navigateBackTo);
  try {
    const response = yield call(
      api.put,
      `/address/${payload.id}`,
      payload,
    );
    yield put(LocationsActions.getLocations());
    showToast(
      'Pronto',
      'Seu endereço alterado com sucesso',
      'success',
    );
  } catch (error) {
    showToast(
      'Ops',
      'Não foi possível alterar seu endereço, tente novamente',
      'danger',
    );
  }
}

function* addLocationWatcher() {
  yield takeLatest(LocationsTypes.ADD_LOCATION_REQUEST, addLocation);
}

function* allLocationsWatcher() {
  yield takeLatest(
    LocationsTypes.GET_LOCATIONS_REQUEST,
    allLocations,
  );
}

function* calcShipmentWatcher() {
  yield takeLatest(
    LocationsTypes.CALC_SHIPMENT_REQUEST,
    calcShipment,
  );
}

function* removeLocationWatcher() {
  yield takeLatest(
    LocationsTypes.REMOVE_LOCATION_REQUEST,
    removeLocation,
  );
}

function* updateLocationWatcher() {
  yield takeLatest(
    LocationsTypes.UPDATE_LOCATION_REQUEST,
    updateLocation,
  );
}

export default function* rootSaga() {
  yield all([
    fork(allLocationsWatcher),
    fork(removeLocationWatcher),
    fork(addLocationWatcher),
    fork(calcShipmentWatcher),
    fork(updateLocationWatcher),
  ]);
}
