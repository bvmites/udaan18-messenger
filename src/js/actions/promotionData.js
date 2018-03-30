import {
  ROUND_DATE_CHANGED,
  ROUND_TIME_CHANGED,
  ROUND_VENUE_CHANGED
} from './actionTypes';

export function changePromotionData({ date, time, venue }) {
  return (dispatch) => {
    dispatch({ type: ROUND_DATE_CHANGED, payload: { date } });
    dispatch({ type: ROUND_TIME_CHANGED, payload: { time } });
    dispatch({ type: ROUND_VENUE_CHANGED, payload: { venue } });
  };
}

export function changeDate(date) {
  return { type: ROUND_DATE_CHANGED, payload: { date } };
}

export function changeTime(time) {
  return { type: ROUND_TIME_CHANGED, payload: { time } };
}

export function changeVenue(venue) {
  return { type: ROUND_VENUE_CHANGED, payload: { venue } };
}
