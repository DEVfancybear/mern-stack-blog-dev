import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import Spinner from "../layout/Spinner";

const PrivateRoute = ({
                          component: Component,
                          authReducers: {isAuthenticated, loading},
                          ...rest
                      }) => (
    <Route
        {...rest}
        render={props =>
            loading ? (
                <Spinner/>
            ) : isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login"/>
            )
        }
    />
);

const mapStateToProps = state => {
    return {
        authReducers: state.authReducers
    }
}

export default connect(mapStateToProps, null)(PrivateRoute);