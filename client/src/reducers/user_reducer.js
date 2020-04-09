import * as types from "../constants/ActionTypes";

const initialState = {
    loginSuccess: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_USER:
            console.log(action.payload);
            return {
                ...state, loginSuccess: action.payload
            }
        case types.REGISTER_USER:
            return {
                ...state, loginSuccess: action.payload
            }
        case types.LOGOUT_USER:
            return {
                ...state, loginSuccess: action.payload
            }
        default:
            return state
    }
}