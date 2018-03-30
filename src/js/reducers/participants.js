import * as actionTypes from '../actions/actionTypes';

const participantsInitialState = {
  isFetching: false,
  fetchError: null,
  fetched: false,
  data: [],
  searchText: ''
};

const participants = (state = participantsInitialState, action) => {
  switch (action.type) {
    case actionTypes.PARTICIPANT_DATA_FETCHING:
      return { ...state, isFetching: true, fetchError: null, fetched: false };
    case actionTypes.PARTICIPANT_DATA_FETCHED:
      return {
        ...state,
        isFetching: false,
        fetchError: null,
        fetched: true,
        data: action.payload.participants.map(
          p => ({ ...p, isSelected: false, isDelivered: p.deliveryStatus === 'D' })
        )
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
    case actionTypes.ALL_PARTICIPANTS_SELECTED:
      return {
        ...state,
        data: state.data.map(p => ({ ...p, isSelected: true }))
      };
    case actionTypes.ALL_PARTICIPANTS_DESELECTED:
      return {
        ...state,
        data: state.data.map(p => ({ ...p, isSelected: false }))
      };
    case actionTypes.PARTICIPANT_MESSAGE_DELIVERED:
      return {
        ...state,
        data: state.data.map(
          p => (
            p.phone === action.payload.phone
              ? { ...p, isDelivered: true, deliveryStatus: action.payload.status }
              : p
          )
        )
      };
    case actionTypes.PARTICIPANTS_PROMOTED:
      return {
        ...state,
        fetched: false
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
