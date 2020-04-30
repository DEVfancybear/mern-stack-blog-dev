import * as types from "../constants/ActionTypes";


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};
export default (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case types.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case types.REGISTER_SUCCESS:
        case types.LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case types.REGISTER_FAIL:
        case types.AUTH_ERROR:
        case types.LOGIN_FAIL:
        case types.LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}