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
  Creators as ProductsActions,
  Types as ProductsTypes,
} from '../../ducks/products';

function* getProducts({ payload }) {
  const companyId = yield select(
    state => state?.company?.company?.id,
  );
  console.tron.log('Company ID', companyId);
  try {
    const response = yield call(
      api.get,
      `/products?company=${companyId}&category=${
        payload.category
      }&subcategory=${
        payload.subcategory ? payload.subcategory : ''
      }`,
    );
    if (response.status === 200) {
      const { page, total, lastPage } = response.data;
      yield put(
        ProductsActions.getProductsSuccess(response.data.data),
      );
    } else {
      showToast(
        'Erro',
        'Ops, problema ao buscar os produtos dessa empresa',
        'error',
      );
      yield put(ProductsActions.getProductsError());
    }
  } catch (e) {
    showToast(
      'Erro',
      'Ops, problema ao buscar os produtos dessa empresa',
      'error',
    );
    yield put(ProductsActions.getProductsError());
  }
}

// function* getCompanyById({ payload }) {
//   try {
//     const { status, data: company } = yield call(
//       api.get,
//       `/companies/${payload}`,
//     );

//     console.tron.log('response companies', company);
//     if (status === 200) {
//       yield put(
//         CompanyActions.getCompanyByIdSuccess({
//           company,
//         }),
//       );
//     } else {
//       showToast('Erro', 'Erro ao obter estabelecimento!', 'error');
//       yield put(CompanyActions.getCompanyByIdError());
//     }
//   } catch (e) {
//     showToast('Erro', 'Erro ao obter estabelecimento!', 'error');
//     yield put(CompanyActions.getCompanyByIdError());
//   }
// }

// function* getCompaniesWatcher() {
//   yield takeLatest(CompanyTypes.GET_COMPANY, getCompanies);
// }

function* getProductsWatcher() {
  yield takeLatest(ProductsTypes.GET_PRODUCTS_REQUEST, getProducts);
}

export default function* rootSaga() {
  yield all([fork(getProductsWatcher)]);
}
