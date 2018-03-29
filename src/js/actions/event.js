import { getEventDetails } from '../api/event';
import { EVENT_DATA_FETCH_ERROR, EVENT_DATA_FETCHED, EVENT_DATA_FETCHING } from './actionTypes';

export function loadEvent(eventId, done) {
  return (dispatch) => {
    dispatch({ type: EVENT_DATA_FETCHING });
    getEventDetails(eventId)
      .then((payload) => {
        dispatch({ type: EVENT_DATA_FETCHED, payload });
        done();
      })
      .catch(error => dispatch({
        type: EVENT_DATA_FETCH_ERROR,
        error
      }));
  };
}
