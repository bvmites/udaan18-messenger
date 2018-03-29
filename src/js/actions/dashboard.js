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
        // TODO handle error properly
        dispatch({ type: EVENT_DATA_FETCH_ERROR, payload: error });
      });
    getParticipants(eventId)
      .then((participants) => {
        dispatch({ type: PARTICIPANT_DATA_FETCHED, payload: { participants } });
      })
      .catch((error) => {
        // TODO
        console.log(error);
        dispatch({ type: PARTICIPANT_DATA_FETCH_ERROR, error });
      });
  };
}

export function unloadDashboard() {
  // unwatchDashboard();
  // return { type: DASHBOARD_UNLOAD };
}
