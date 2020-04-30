import {combineReducers} from "redux";
import alertReducers from "./alertReducers";
import authReducers from "./authReducers";
export default combineReducers({alertReducers,authReducers});