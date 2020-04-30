import * as types from "../constants/ActionTypes";
import {v4 as uuidv4} from 'uuid';


export const setAlert = (msg, alertType) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: types.SET_ALERT,
        payload: {msg, alertType, id}
    });
    setTimeout(() => dispatch({type: types.REMOVE_ALERT, payload: id}), 5000);
};