import {
  EVENT_DATA_FETCH_ERROR,
  EVENT_DATA_FETCHED,
  EVENT_DATA_FETCHING,
  PARTICIPANT_DATA_FETCH_ERROR,
  PARTICIPANT_DATA_FETCHED,
  PARTICIPANT_DATA_FETCHING
} from './actionTypes';
import { getEventDetails } from '../api/event';
import { getParticipants } from '../api/participants';

export function loadDashboard(eventId) {
  return (dispatch) => {
    dispatch({ type: EVENT_DATA_FETCHING });
    dispatch({ type: PARTICIPANT_DATA_FETCHING });
    getEventDetails(eventId)
      .then((eventDetails) => {
        dispatch({ type: EVENT_DATA_FETCHED, payload: eventDetails });
      })
      .catch((error) => {
        if (error.json) {
          dispatch({
            type: EVENT_DATA_FETCH_ERROR,
            error: error.json().message
          });
        } else {
          dispatch({
            type: EVENT_DATA_FETCH_ERROR,
            error: 'Network error'
          });
        }
      });
    getParticipants(eventId)
      .then((participants) => {
        dispatch({ type: PARTICIPANT_DATA_FETCHED, payload: { participants } });
      })
      .catch((error) => {
        if (error.json) {
          return error.json().then(errObj =>
            dispatch({
              type: PARTICIPANT_DATA_FETCH_ERROR,
              error: errObj.message
            }));
        }
        return dispatch({
          type: PARTICIPANT_DATA_FETCH_ERROR,
          error: 'Network Error'
        });
      });
  };
}

export function unloadDashboard() {
  // unwatchDashboard();
  // return { type: DASHBOARD_UNLOAD };
}
