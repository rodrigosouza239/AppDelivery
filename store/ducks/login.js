export const Types = {
  LOGIN_REQUEST: 'LOGIN/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN/LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN/LOGIN_FAIL',
  REFRESH_LOGIN_REQUEST: 'LOGIN/REFRESH_LOGIN_REQUEST',
  REFRESH_LOGIN_SUCCESS: 'LOGIN/REFRESH_LOGIN_SUCCESS',
  REFRESH_LOGIN_FAIL: 'LOGIN/REFRESH_LOGIN_FAIL',
  LOGIN_LOGOUT: 'LOGIN/LOGIN_LOGOUT',
};

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: false,
  redirectTo: null,
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return { ...state, loading: true };
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
        redirectTo: action.redirectTo,
      };
    case Types.LOGIN_FAIL:
      return { ...state, loading: false, error: true };
    case Types.LOGIN_LOGOUT:
      return {
        data: null,
        loading: false,
        error: false,
      };
    case Types.REFRESH_LOGIN_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case Types.REFRESH_LOGIN_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    }
    case Types.REFRESH_LOGIN_FAIL: {
      return { ...state, data: null, loading: false, error: true };
    }
    default:
      return state;
  }
}

export const Creators = {
  loginRequest: payload => ({
    type: Types.LOGIN_REQUEST,
    payload,
  }),
  loginSuccess: (payload, redirectTo) => ({
    type: Types.LOGIN_SUCCESS,
    payload,
    redirectTo,
  }),
  loginFail: () => ({
    type: Types.LOGIN_FAIL,
  }),
  loginLogout: () => ({
    type: Types.LOGIN_LOGOUT,
  }),
  refreshLoginRequest: payload => ({
    type: Types.REFRESH_LOGIN_REQUEST,
    payload,
  }),
  refreshLoginSuccess: payload => ({
    type: Types.REFRESH_LOGIN_SUCCESS,
    payload,
  }),
  refreshLoginFail: () => ({
    type: Types.REFRESH_LOGIN_FAIL,
  }),
};
