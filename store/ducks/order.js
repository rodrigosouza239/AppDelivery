export const Types = {
  GET_ORDERS: 'ORDER/GET_ORDERS',
  GET_ORDERS_SUCCESS: 'ORDER/GET_ORDERS_SUCCESS',
  GET_ORDERS_FAIL: 'ORDER/GET_ORDERS_FAIL',
  GET_ORDER_BY_ID: 'ORDER/GET_ORDER_BY_ID',
  GET_ORDER_BY_ID_SUCCESS: 'ORDER/GET_ORDER_BY_ID_SUCCESS',
  GET_ORDER_BY_ID_FAIL: 'ORDER/GET_ORDERS_FAIL',
  ADD_ITEM: 'ORDER/ADD_ITEM',
  ADD_ITEM_SUCCESS: 'ORDER/ADD_ITEM_SUCCESS',
  ADD_ITEM_FAIL: 'ORDER/ADD_ITEM_FAIL',
  CREATE_ORDER: 'ORDER/CREATE_ORDER',
  CREATE_ORDER_SUCCESS: 'ORDER/CREATE_ORDER_SUCCESS',
  CREATE_ORDER_FAIL: 'ORDER/CREATE_ORDER_FAIL',
};

const INITIAL_STATE = {
  loading: false,
  order: null,
  data: null,
  cart: null,
  error: null,
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_ORDERS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Types.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null,
      };
    case Types.GET_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case Types.GET_ORDER_BY_ID:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Types.GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case Types.GET_ORDER_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case Types.ADD_ITEM:
      return {
        ...state,
        ...action.payload,
        loading: true,
        error: null,
      };
    case Types.ADD_ITEM_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: false,
      };
    case Types.ADD_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case Types.CREATE_ORDER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        cart: null,
        loading: false,
        error: false,
      };
    case Types.CREATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}

export const Creators = {
  getOrders: payload => ({
    type: Types.GET_ORDERS,
    payload,
  }),
  getOrdersSuccess: payload => ({
    type: Types.GET_ORDERS_SUCCESS,
    payload,
  }),
  getOrdersFail: () => ({
    type: Types.GET_ORDERS_FAIL,
  }),
  getOrderById: payload => ({
    type: Types.GET_ORDER_BY_ID,
    payload,
  }),
  getOrderByIdSuccess: payload => ({
    type: Types.GET_ORDER_BY_ID_SUCCESS,
    payload,
  }),
  getOrderByIdFail: () => ({
    type: Types.GET_ORDER_BY_ID_FAIL,
  }),
  addItem: payload => ({
    type: Types.ADD_ITEM,
    payload,
  }),
  addItemSuccess: payload => ({
    type: Types.ADD_ITEM_SUCCESS,
    payload,
  }),
  addItemFail: () => ({
    type: Types.ADD_ITEM_FAIL,
  }),
  createOrder: (
    payload,
    addressId,
    paymentType,
    change,
    deliveryType,
  ) => ({
    type: Types.CREATE_ORDER,
    payload,
    addressId,
    paymentType,
    change,
    deliveryType,
  }),
  createOrderSuccess: payload => ({
    type: Types.CREATE_ORDER_SUCCESS,
    payload,
  }),
  createOrderFail: () => ({
    type: Types.CREATE_ORDER_FAIL,
  }),
};
