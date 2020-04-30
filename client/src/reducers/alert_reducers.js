import * as types from "../constants/ActionTypes";

const initialState = {
    alert: []
};
export default (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case types.SET_ALERT: {
            return {
                ...state, alert: payload
            }
        }
        case types.REMOVE_ALERT: {
            return {
                ...state, alert: alert.filter(alertRM => alertRM.id !== payload)
            }
        }
        default:
            return state;
    }
};
