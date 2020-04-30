import * as types from "../constants/ActionTypes";
import {v4 as uuidv4} from 'uuid';
import axios from "axios";

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