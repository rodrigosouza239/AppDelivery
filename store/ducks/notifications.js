export const Types = {
  SET_SCREEN: 'NOTIFICATIONS/SET_SCREEN',
  RESET_SCREEN: 'NOTIFICATIONS/RESET_SCREEN',
};

const INITIAL_STATE = {
  screen: null,
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_SCREEN:
      return { ...state, screen: action.payload };
    case Types.RESET_SCREEN:
      return { ...state, screen: null };
    default:
      return state;
  }
}

export const Creators = {
  setScreen: payload => ({
    type: Types.SET_SCREEN,
    payload,
  }),
  resetScreen: () => ({
    type: Types.RESET_SCREEN,
  }),
};
