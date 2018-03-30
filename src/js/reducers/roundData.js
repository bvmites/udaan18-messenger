import * as actionTypes from '../actions/actionTypes';

const roundDataInitialState = {
  date: '',
  time: '',
  venue: ''
};

const roundData = (state = roundDataInitialState, action) => {
  switch (action.type) {
    case actionTypes.ROUND_DATE_CHANGED:
      return { ...state, date: action.payload.date };
    case actionTypes.ROUND_TIME_CHANGED:
      return { ...state, time: action.payload.time };
    case actionTypes.ROUND_VENUE_CHANGED:
      return { ...state, venue: action.payload.venue };
    default:
      return state;
  }
};

export default roundData;
