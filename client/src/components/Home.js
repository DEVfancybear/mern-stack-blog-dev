import React from "react";
import {connect} from "react-redux";
import {logoutUser} from "../actions/index";
import {withRouter} from 'react-router';
import {compose} from "redux";

const Home = ({logoutUser, history, user_reducer: {name}}) => {
    const logOutUserLogin = () => {
        logoutUser();
        history.push("/login");
    }
    return (
        <div>
            {name}
            <button onClick={logOutUserLogin}>
                Logout
            </button>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        user_reducer: state.user_reducer
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        logoutUser: () => {
            dispatch(logoutUser())
        }
    }
}
const HomeRouter = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))
export default HomeRouter(Home);