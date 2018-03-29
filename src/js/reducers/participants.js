import * as actionTypes from '../actions/actionTypes';

const participantsInitialState = {
  isFetching: false,
  fetchError: null,
  data: [],
  searchText: ''
};
// TODO Actions for changing search text
const participants = (state = participantsInitialState, action) => {
  switch (action.type) {
    case actionTypes.PARTICIPANT_DATA_FETCHING:
      return { ...state, isFetching: true, fetchError: null };
    case actionTypes.PARTICIPANT_DATA_FETCHED:
      return {
        ...state,
        isFetching: false,
        fetchError: null,
        data: action.payload.participants.map(p => ({ ...p, isSelected: false, isDelivered: p.deliveryStatus === 'D' }))
      };
    case actionTypes.PARTICIPANT_DATA_FETCH_ERROR:
      return { ...state, isFetching: false, fetchError: action.error };
    case actionTypes.PARTICIPANT_SELECTED:
      return {
        ...state,
        data: state.data.map(
          p => (p._id === action.payload._id ? { ...p, isSelected: true } : p)
        )
      };
    case actionTypes.PARTICIPANT_DESELECTED:
      return {
        ...state,
        data: state.data.map(
          p => (p._id === action.payload._id ? { ...p, isSelected: false } : p)
        )
      };
    case actionTypes.PARTICIPANT_MESSAGE_DELIVERED:
      return {
        ...state,
        data: state.data.map(
          p => (p._id === action.payload._id ? { ...p, delivered: true } : p)
        )
      };
    case actionTypes.SEARCH_CHANGED:
      return {
        ...state,
        searchText: action.payload.text
      };
    default:
      return state;
  }
};

export default participants;
