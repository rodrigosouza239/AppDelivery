export const Types = {
  REGISTER_REQUEST: 'REGISTER/REGISTER_REQUEST',
  REGISTER_REQUEST_SUCCESS: 'REGISTER/REGISTER_SUCCESS',
  REGISTER_REQUEST_FAIL: 'REGISTER/REGISTER_FAIL',
};

const INITIAL_STATE = {
  loading: false,
  error: false,
};

export default function register(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REGISTER_REQUEST:
      console.log(action.payload);
      return { ...state, loading: true };
    case Types.REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case Types.LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export const Creators = {
  registerRequest: payload => ({
    type: Types.REGISTER_REQUEST,
    payload,
  }),
  registerSuccess: () => ({
    type: Types.REGISTER_REQUEST_SUCCESS,
  }),
  registerFail: () => ({
    type: Types.REGISTER_REQUEST_FAIL,
  }),
};
