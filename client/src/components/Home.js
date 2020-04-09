import React from "react";
import {connect} from "react-redux";
import {logoutUser} from "../actions/index";

const Home = ({logoutUser, history}) => {
    const logOutUserLogin = () => {
        logoutUser();
        history.push("/login");
    }
    return (
        <div>
            Home
            <button onClick={logOutUserLogin}>
                Logout
            </button>
        </div>
    )
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        logoutUser: () => {
            dispatch(logoutUser())
        }
    }
}
export default connect(null, mapDispatchToProps)(Home);