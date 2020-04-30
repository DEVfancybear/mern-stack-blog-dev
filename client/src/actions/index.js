import * as types from "../constants/ActionTypes";
import {v4 as uuidv4} from 'uuid';
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
// =================== AUTH =================================//
export const setAlert = (msg, alertType) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: types.SET_ALERT,
        payload: {msg, alertType, id}
    });
    setTimeout(() => dispatch({type: types.REMOVE_ALERT, payload: id}), 5000);
};

export const register = sendDataRegister => {
    return async dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(sendDataRegister);
        try {
            const res = await axios.post("/api/users", body, config);
            const data = await res.data;
            dispatch({
                type: types.REGISTER_SUCCESS,
                payload: data
            })
        } catch (e) {
            const errors = e.response.data.errors;
            if (errors) {
                errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
            }
            dispatch({
                type: types.REGISTER_FAIL
            })
        }
    }
}
export const loadUser = () => {
    return async dispatch => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        try {
            const res = await axios.get('/api/auth');
            const data = await res.data;
            dispatch({
                type: types.USER_LOADED,
                payload: data
            })
        } catch (e) {
            dispatch({
                type: types.AUTH_ERROR
            })
        }
    }
}
export const login = sendDataLogin => {
    return async dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(sendDataLogin);
        try {
            const res = await axios.post("/api/auth", body, config);
            const data = await res.data;
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: data
            })
            dispatch(loadUser());
        } catch (e) {
            const errors = e.response.data.errors;
            if (errors) {
                errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
            }
            dispatch({
                type: types.LOGIN_FAIL
            })
        }
    }
}
//Logout and clear profile
export const logout = () => {
    return dispatch => {
        dispatch({
            type: types.LOGOUT
        })
    }
}

// =================== PROFILE ======================================= //
// Get currents user profile
export const getCurrentProfile = () => {
    return async dispatch => {
        try {
            const res = await axios.get("/api/profile/me");
            const data = await res.data;
            dispatch({
                type: types.GET_PROFILE,
                payload: data
            })
        } catch (e) {
            dispatch({
                type: types.PROFILE_ERROR,
                payload: {msg: e.response.statusText, status: e.response.status}
            })
        }
    }
}