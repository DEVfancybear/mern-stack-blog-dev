import React, {Fragment, useEffect} from "react";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import {loadUser} from './actions/index';
import setAuthToken from './utils/setAuthToken';
import Dashboard from "./components/dashboard/Dashboard";
import {connect} from "react-redux";
import PrivateRoute from "./components/routing/PrivateRoute";
const App = ({loadUser}) => {
    useEffect(() => {
        setAuthToken(localStorage.token);
        loadUser();
    }, []);
    return (
        <Router>
            <Fragment>
                <Navbar/>
                <Route exact={true} path="/" component={Landing}/>
                <section className="container">
                    <Alert/>
                    <Switch>
                        <Route exact={true} path="/register" component={Register}/>
                        <Route exact={true} path="/login" component={Login}/>
                        <PrivateRoute exact={true} path="/dashboard" component={Dashboard}/>
                    </Switch>
                </section>
            </Fragment>
        </Router>
    );
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        loadUser: () => {
            dispatch(loadUser())
        }
    }
}
export default connect(null,mapDispatchToProps)(App);
