import * as types from "../constants/ActionTypes";


const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
};
export default (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case types.GET_PROFILE:
            console.log(payload)
            return {
                ...state,
                profile: payload,
                loading: false,
            }
        case types.PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}