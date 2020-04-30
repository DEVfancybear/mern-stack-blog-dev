import {combineReducers} from "redux";
import alertReducers from "./alertReducers";
import authReducers from "./authReducers";
import profileReducers from "./profileReducers";

export default combineReducers({alertReducers, authReducers, profileReducers});