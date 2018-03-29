import * as actionTypes from '../actions/actionTypes';

const eventInitialState = {
  isFetching: false,
  fetchError: null,
  data: {
    name: 'Test Name',
    round: 2
  }
};

const event = (state = eventInitialState, action) => {
  switch (action.type) {
    case actionTypes.EVENT_DATA_FETCHING:
      return { ...state, isFetching: true, fetchError: null };
    case actionTypes.EVENT_DATA_FETCHED:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
        fetchError: null
      };
    case actionTypes.EVENT_DATA_FETCH_ERROR:
      return { ...state, isFetching: false, fetchError: action.error };
    default:
      return state;
  }
};

export default event;
