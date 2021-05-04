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
  Creators as CompanyActions,
  Types as CompanyTypes,
} from '../../ducks/company';
import {
  Creators as ProductsActions,
  Types as ProductsTypes,
} from '../../ducks/products';

function* getCompanies({ payload }) {
  const { currentLocation } = yield select(state => state.locations);

  try {
    const response = yield call(
      api.get,
      `/companies${
        currentLocation
          ? `?city=${currentLocation.city}&state=${currentLocation.state}`
          : ''
      }`,
      payload,
    );

    if (response.status === 200) {
      const { page, total, lastPage } = response.data;
      yield put(
        CompanyActions.getCompanySuccess({
          companies: response.data.data,
          page,
          total,
          lastPage,
        }),
      );
    } else {
      showToast('Erro', 'Erro ao obter estabelecimentos', 'error');
      yield put(CompanyActions.getCompanyError());
    }
  } catch (e) {
    showToast('Erro', 'Erro ao obter estabelecimentos', 'error');
    yield put(CompanyActions.getCompanyError());
  }
}

function* getCompanyById({ payload }) {
  try {
    const { status, data: company } = yield call(
      api.get,
      `/companies/${payload}`,
    );

    if (status === 200) {
      yield put(
        CompanyActions.getCompanyByIdSuccess({
          company,
        }),
      );
    } else {
      showToast('Erro', 'Erro ao obter estabelecimento!', 'error');
      yield put(CompanyActions.getCompanyByIdError());
    }
  } catch (e) {
    showToast('Erro', 'Erro ao obter estabelecimento!', 'error');
    yield put(CompanyActions.getCompanyByIdError());
  }
}

function* getCompaniesWatcher() {
  yield takeLatest(CompanyTypes.GET_COMPANY, getCompanies);
}

function* getCompanyByIdWatcher() {
  yield takeLatest(CompanyTypes.GET_COMPANY_BY_ID, getCompanyById);
}

export default function* rootSaga() {
  yield all([fork(getCompaniesWatcher), fork(getCompanyByIdWatcher)]);
}
