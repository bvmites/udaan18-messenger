import * as actionTypes from '../actions/actionTypes';

const promotionDataInitialState = {
  isSending: false,
  sendError: null,
};

const promotionData = (state = promotionDataInitialState, action) => {
  switch (action.type) {
    case actionTypes.PARTICIPANTS_PROMOTING:
      return { ...state, isSending: true, sendError: null };
    case actionTypes.PARTICIPANTS_PROMOTED:
      return { ...state, isSending: false, sendError: null };
    case actionTypes.PARTICIPANTS_PROMOTE_ERROR:
      return { ...state, isSending: false, sendError: action.error };
    case actionTypes.ROUND_DATE_CHANGED:
    case actionTypes.ROUND_TIME_CHANGED:
    case actionTypes.ROUND_VENUE_CHANGED:
      return { ...state, sendError: null };
    default:
      return state;
  }
};

export default promotionData;
