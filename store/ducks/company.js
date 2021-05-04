import { takeLatest, put, call } from 'redux-saga/effects';
import { showToast } from '../../utils/toast';

export const Types = {
  GET_COMPANY: 'COMPANY/GET_COMPANY',
  GET_COMPANY_SUCCESS: 'COMPANY/GET_COMPANY_SUCCESS',
  GET_COMPANY_ERROR: 'COMPANY/GET_COMPANY_ERROR',
  GET_COMPANY_BY_ID: 'COMPANY/GET_COMPANY_BY_ID',
  GET_COMPANY_BY_ID_SUCCESS: 'COMPANY/GET_COMPANY_BY_ID_SUCCESS',
  GET_COMPANY_BY_ID_ERROR: 'COMPANY/GET_COMPANY_BY_ID_ERROR',
};

const INITIAL_STATE = {
  loading: false,
  companies: [],
  company: null,
  page: null,
  total: null,
  lastPage: null,
};

export default function company(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_COMPANY: {
      return { ...state, loading: true };
    }
    case Types.GET_COMPANY_SUCCESS: {
      return { ...state, ...action.payload, loading: false };
    }
    case Types.GET_COMPANY_ERROR: {
      return { ...state, loading: false };
    }
    case Types.GET_COMPANY_BY_ID: {
      return { ...state, loading: true };
    }
    case Types.GET_COMPANY_BY_ID_SUCCESS: {
      return { ...state, ...action.payload, loading: false };
    }
    case Types.GET_COMPANY_BY_ID_ERROR: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
}

export const Creators = {
  getCompany: payload => ({
    type: Types.GET_COMPANY,
    payload,
  }),
  getCompanySuccess: payload => ({
    type: Types.GET_COMPANY_SUCCESS,
    payload,
  }),
  getCompanyError: () => ({
    type: Types.GET_COMPANY_ERROR,
  }),
  getCompanyById: payload => ({
    type: Types.GET_COMPANY_BY_ID,
    payload,
  }),
  getCompanyByIdSuccess: payload => ({
    type: Types.GET_COMPANY_BY_ID_SUCCESS,
    payload,
  }),
  getCompanyByIdError: () => ({
    type: Types.GET_COMPANY_BY_ID_ERROR,
  }),
};
