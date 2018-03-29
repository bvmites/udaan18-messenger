import * as actionTypes from '../actions/actionTypes';

const promotionDataInitialState = {
    isSending: false,
    sendError: null,
    result: ''
};

const promotionData = (state = promotionDataInitialState, action) => {
    switch (action.type) {
        case actionTypes.PROMOTION_DATA_SENDING:
            return {...state, isSending: true, sendError: null};
        case actionTypes.PROMOTION_DATA_SENT:
            return {...state, isSending: false, sendError: null, result: action.payload.result};
        case actionTypes.PROMOTION_DATA_SEND_FAILED:
            return {...state, isSending: false, sendError: action.error};
        default:
            return state;
    }
};

export default promotionData;