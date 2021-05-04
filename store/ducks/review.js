export const Types = {
  ADD_REVIEW: 'REVIEW/ADD_REVIEW',
  ADD_REVIEW_SUCCESS: 'REVIEW/ADD_REVIEW_SUCCESS',
  ADD_REVIEW_FAIL: 'REVIEW/ADD_REVIEW_FAIL',
};

const INITIAL_STATE = {
  loading: false,
  error: null,
};

export default function register(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REVIEW:
      return { ...state, loading: true, error: null };
    case Types.ADD_REVIEW_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: false,
      };
    case Types.ADD_REVIEW_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

export const Creators = {
  addReview: payload => ({
    type: Types.ADD_REVIEW,
    payload,
  }),
  addReviewSuccess: payload => ({
    type: Types.ADD_REVIEW_SUCCESS,
    payload,
  }),
  addReviewFail: () => ({
    type: Types.ADD_REVIEW_FAIL,
  }),
};
