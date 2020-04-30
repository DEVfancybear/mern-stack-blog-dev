import * as types from "../constants/ActionTypes";
import uuid from "uuid";

export const setAlert = (msg, alertType) => dispatch => {
    const id = uuid.v4();
    dispatch({
        type: types.SET_ALERT,
        payload: {msg, alertType, id}
    })
}