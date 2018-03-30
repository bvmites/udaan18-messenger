import { postUser } from '../api/user';
import { decodeToken, updateHeaders } from '../api/utils';
import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_LOGGING_IN, USER_LOGIN_FAILED } from './actionTypes';

export function login(username, password, done) {
  if (!username) {
    return { type: USER_LOGIN_FAILED, error: 'Missing username' };
  }

  if (!password) {
    return { type: USER_LOGIN_FAILED, error: 'Missing password' };
  }

  return (dispatch) => {
    dispatch({ type: USER_LOGGING_IN });
    return postUser(username, password)
      .then((payload) => {
        updateHeaders({ Authorization: payload.token });
        dispatch({
          type: USER_LOGGED_IN,
          payload: {
            eventId: decodeToken(payload.token).user.eventId
          }
        });
        done();
      })
      .catch((error) => {
        if (error.json) {
          return error.json().then(errObj => dispatch({
            type: USER_LOGIN_FAILED,
            error: errObj.message || 'Error'
          }));
        }
        return dispatch({
          type: USER_LOGIN_FAILED,
          error: 'Network Error'
        });
      });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: USER_LOGGED_OUT });
    updateHeaders({ Authorization: undefined });
    window.location.href = '/login'; // reload fully
  };
}
