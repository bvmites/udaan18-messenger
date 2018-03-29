import { getParticipants, promoteToNextRound } from '../api/participants';
import {
  PARTICIPANT_DATA_FETCH_ERROR,
  PARTICIPANT_DATA_FETCHED,
  PARTICIPANT_DATA_FETCHING,
  PARTICIPANT_DESELECTED, PARTICIPANT_PROMOTE_ERROR, PARTICIPANT_PROMOTING,
  PARTICIPANT_SELECTED, PARTICIPANTS_PROMOTED, SEARCH_CHANGED
} from './actionTypes';

export function loadParticipants(eventId, done) {
  return (dispatch) => {
    dispatch({ type: PARTICIPANT_DATA_FETCHING });
    getParticipants(eventId)
      .then((payload) => {
        dispatch({ type: PARTICIPANT_DATA_FETCHED, payload });
        done();
      })
      .catch(error => dispatch({
        type: PARTICIPANT_DATA_FETCH_ERROR,
        error
      }));
  };
}

export function changeSearchText(text) {
  return { type: SEARCH_CHANGED, payload: { text } };
}

export function selectParticipant(_id) {
  return { type: PARTICIPANT_SELECTED, payload: { _id } };
}

export function deselectParticipant(_id) {
  return { type: PARTICIPANT_DESELECTED, payload: { _id } };
}

export function promoteParticipants(ids, eventId, date, time, venue, done) {
  return (dispatch) => {
    dispatch({ type: PARTICIPANT_PROMOTING });
    promoteToNextRound(ids, eventId, date, time, venue)
      .then(() => {
        dispatch({ type: PARTICIPANTS_PROMOTED });
        done();
      })
      .catch(error => dispatch({
        type: PARTICIPANT_PROMOTE_ERROR,
        error
      }));
  };
}
