import { takeLatest, put, call } from 'redux-saga/effects';
import { showToast } from '../../utils/toast';

export const Types = {
  GET_PRODUCTS_REQUEST: 'PRODUCTS/GET_PRODUCTS_REQUEST',
  GET_PRODUCTS_SUCCESS: 'COMPANY/GET_COMPANY_SUCCESS_REQUEST',
  GET_PRODUCTS_ERROR: 'PRODUCTS/GET_PRODUCTS_ERROR',
  // GET_COMPANY_BY_ID: 'COMPANY/GET_COMPANY_BY_ID',
  // GET_COMPANY_BY_ID_SUCCESS: 'COMPANY/GET_COMPANY_BY_ID_SUCCESS',
  // GET_COMPANY_BY_ID_ERROR: 'COMPANY/GET_COMPANY_BY_ID_ERROR',
};

const INITIAL_STATE = {
  loading: false,
  products: [],
};

export default function products(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_PRODUCTS_REQUEST: {
      return { ...state, loading: true };
    }
    case Types.GET_PRODUCTS_SUCCESS: {
      return { ...state, products: action.payload, loading: false };
    }
    case Types.GET_PRODUCTS_ERROR: {
      return { ...state, loading: false };
    }
    // case Types.GET_COMPANY_BY_ID: {
    //   return { ...state, loading: true };
    // }
    // case Types.GET_COMPANY_BY_ID_SUCCESS: {
    //   return { ...state, ...action.payload, loading: false };
    // }
    // case Types.GET_COMPANY_BY_ID_ERROR: {
    //   return { ...state, loading: false };
    // }
    default:
      return state;
  }
}

export const Creators = {
  getProductsRequest: payload => ({
    type: Types.GET_PRODUCTS_REQUEST,
    payload,
  }),
  getProductsSuccess: payload => ({
    type: Types.GET_PRODUCTS_SUCCESS,
    payload,
  }),
  getProductsError: () => ({
    type: Types.GET_PRODUCTS_ERROR,
  }),
  // getCompanyById: payload => ({
  //   type: Types.GET_COMPANY_BY_ID,
  //   payload,
  // }),
  // getCompanyByIdSuccess: payload => ({
  //   type: Types.GET_COMPANY_BY_ID_SUCCESS,
  //   payload,
  // }),
  // getCompanyByIdError: () => ({
  //   type: Types.GET_COMPANY_BY_ID_ERROR,
  // }),
};
