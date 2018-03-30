import { getParticipants, promoteToNextRound } from '../api/participants';
import {
  ALL_PARTICIPANTS_DESELECTED,
  ALL_PARTICIPANTS_SELECTED,
  PARTICIPANT_DATA_FETCH_ERROR,
  PARTICIPANT_DATA_FETCHED,
  PARTICIPANT_DATA_FETCHING,
  PARTICIPANT_DESELECTED, PARTICIPANT_MESSAGE_DELIVERED,
  PARTICIPANT_SELECTED,
  PARTICIPANTS_PROMOTE_ERROR,
  PARTICIPANTS_PROMOTED,
  PARTICIPANTS_PROMOTING,
  SEARCH_CHANGED
} from './actionTypes';

export function loadParticipants(eventId, done) {
  return (dispatch) => {
    dispatch({ type: PARTICIPANT_DATA_FETCHING });
    getParticipants(eventId)
      .then((payload) => {
        dispatch({ type: PARTICIPANT_DATA_FETCHED, payload });
        done();
      })
      .catch((error) => {
        if (error.json) {
          return error.json().then((errObj) => {
            dispatch({
              type: PARTICIPANT_DATA_FETCH_ERROR,
              error: errObj.message
            });
          });
        }
        return dispatch({
          type: PARTICIPANT_DATA_FETCH_ERROR,
          error: 'Network error'
        });
      });
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

export function selectAllParticipants() {
  return { type: ALL_PARTICIPANTS_SELECTED };
}

export function clearAllParticipants() {
  return { type: ALL_PARTICIPANTS_DESELECTED };
}

export function promoteParticipants(ids, eventId, date, time, venue, done) {
  if (ids && ids.length <= 0) {
    return { type: PARTICIPANTS_PROMOTE_ERROR, error: 'Please select at least 1 participant' };
  }

  if (!date) {
    return { type: PARTICIPANTS_PROMOTE_ERROR, error: 'Please select a date.' };
  }

  if (!time) {
    return { type: PARTICIPANTS_PROMOTE_ERROR, error: 'Please select a time.' };
  }

  if (!venue) {
    return { type: PARTICIPANTS_PROMOTE_ERROR, error: 'Please type in a venue' };
  }

  if (venue.length >= 20) {
    return { type: PARTICIPANTS_PROMOTE_ERROR, error: 'Venue must be 20 characters or less.' };
  }

  return (dispatch) => {
    dispatch({ type: PARTICIPANTS_PROMOTING });
    promoteToNextRound(ids, eventId, date, time, venue)
      .then(() => {
        dispatch({ type: PARTICIPANTS_PROMOTED });
        done();
      })
      .catch((error) => {
        console.log(error);
        if (error.json) {
          error.json().then(errObj => dispatch({
            type: PARTICIPANTS_PROMOTE_ERROR,
            error: errObj.message
          }));
        }
        return dispatch({
          type: PARTICIPANTS_PROMOTE_ERROR,
          error: 'Network error'
        });
      });
  };
}

export function updateDeliveryStatus(phone, status) {
  return {
    type: PARTICIPANT_MESSAGE_DELIVERED,
    payload: { phone, status }
  };
}
