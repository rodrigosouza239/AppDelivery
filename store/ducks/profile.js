export const Types = {
  PROFILE_UPDATE_REQUEST: 'PROFILE/UPDATE_REQUEST',
  PROFILE_UPDATE_SUCCESS: 'PROFILE/UPDATE_SUCCESS',
  PROFILE_UPDATE_FAIL: 'PROFILE/UPDATE_FAIL',
};

const INITIAL_STATE = {
  loading: false,
  error: false,
};

export default function profile(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.PROFILE_UPDATE_REQUEST:
      return { ...state, loading: true };
    case Types.PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case Types.PROFILE_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export const Creators = {
  profileUpdateRequest: payload => ({
    type: Types.PROFILE_UPDATE_REQUEST,
    payload,
  }),
  profileUpdateSuccess: () => ({
    type: Types.PROFILE_UPDATE_SUCCESS,
  }),
  profileUpdateFail: () => ({
    type: Types.PROFILE_UPDATE_FAIL,
  }),
};
