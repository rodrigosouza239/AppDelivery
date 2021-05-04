import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { showToast } from '../../../utils/toast';

import {
  Creators as RegisterActions,
  Types as RegisterTypes,
} from '../../ducks/register';

// eslint-disable-next-line require-yield
function* register({ payload }) {
  const data = {
    name: payload.name,
    email: payload.email,
    cpf: payload.cpf,
    phone_ddd: payload.phone.slice(0, 2),
    phone_num: payload.phone.slice(2, 14),
    password: payload.password,
    password_confirmation: payload.password,
  };

  try {
    const response = yield call(api.post, '/users', data);

    yield put(RegisterActions.registerSuccess());
    showToast(
      'Feito',
      'Seu cadastro foi realizado com sucesso',
      'success',
    );
  } catch (error) {
    yield put(RegisterActions.registerFail());

    showToast(
      'Ops',
      'Erro ao realizar seu cadastro, tente novamente',
      'danger',
    );
  }
}

function* registerWatcher() {
  yield takeLatest(RegisterTypes.REGISTER_REQUEST, register);
}

export default function* rootSaga() {
  yield all([fork(registerWatcher)]);
}
