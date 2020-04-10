import * as types from "../constants/ActionTypes";

const initialState = {
    user: null,
    loading: true,
    userData: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_USER:
            return {
                ...state, user: action.payload,
                loading: false
            }
        case types.REGISTER_USER:
            return {
                ...state, user: action.payload,
                loading: false
            }
        case types.LOGOUT_USER:
            return {
                ...state, user: action.payload,
                loading: false
            }
        case types.AUTH_CHECK:
            console.log(action.payload);
            return {
                ...state, userData: action.payload
            }
        default:
            return state
    }
}