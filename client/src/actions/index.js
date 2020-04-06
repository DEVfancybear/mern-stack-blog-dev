import * as types from "../constants/ActionTypes";
import axios from "axios";

const API = "http://localhost:5000/api/"
export const loginUser = dataSubmit => {
    return async dispatch => {
        const req = await axios.post(API + "users/login", dataSubmit);
        const data = await req.data;
        dispatch({
            type: types.LOGIN_USER,
            payload: data
        })
    }
}