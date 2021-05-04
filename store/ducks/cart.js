import { takeLatest, put, call } from 'redux-saga/effects';
import { showToast } from '../../utils/toast';

export const Types = {
  ADD_CART: 'CART/ADD_CART',
  UPDATE_CART: 'CART/UPDATE_CART',
  REMOVE_CART: 'CART/REMOVE_CART',
  CLEAR_CART: 'CART/CLEAR_CART',
};

const INITIAL_STATE = {
  loading: false,
  cart: [],
  company_id: null,
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_CART: {
      let { company_id } = state;
      if (!company_id) {
        company_id = action.payload.company_id;
      }
      return {
        ...state,
        company_id,
        cart: [...state.cart, action.payload],
      };
    }
    case Types.UPDATE_CART: {
      return {
        ...state,
        cart: [
          ...state.cart.filter(e => e.cart_id !== action.cart_id),
          action.payload,
        ],
      };
    }
    case Types.REMOVE_CART: {
      return {
        ...state,
        cart: [
          ...state.cart.filter(e => e.cart_id !== action.cart_id),
        ],
      };
    }
    case Types.CLEAR_CART: {
      return {
        ...INITIAL_STATE,
      };
    }
    default:
      return state;
  }
}

export const Creators = {
  addCart: payload => ({
    type: Types.ADD_CART,
    payload,
  }),
  updateCart: (cart_id, payload) => ({
    type: Types.UPDATE_CART,
    cart_id,
    payload,
  }),
  removeCart: cart_id => ({
    type: Types.REMOVE_CART,
    cart_id,
  }),
  clearCart: () => ({
    type: Types.CLEAR_CART,
  }),
};
