import * as actionTypes from '../actions/actionTypes';

const userInitialState = {
  isLoggedIn: false,
  isLoggingIn: false,
  isLoggingOut: false,
  loginError: null,
  eventID: undefined
};

const user = (state = userInitialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGGING_IN:
      return { ...state, isLoggingIn: true, loginError: null };
    case actionTypes.USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        loginError: null,
        eventId: action.payload.eventId
      };
    case actionTypes.USER_LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
        loginError: action.error,
      };
    case actionTypes.USER_LOGGING_OUT:
      return {
        ...state,
        isLoggingOut: true
      };
    case actionTypes.USER_LOGGED_OUT:
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        loginError: null,
        eventId: undefined
      };
    default:
      return state;
  }
};

export default user;
