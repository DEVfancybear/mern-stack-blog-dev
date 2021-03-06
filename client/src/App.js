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
import CreateProfile from "./components/profile_forms/CreateProfile";
import EditProfile from "./components/profile_forms/EditProfile";
import AddEducation from "./components/profile_forms/AddEducation";
import AddExperience from "./components/profile_forms/AddExperience";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import NotFound from "./components/layout/NotFound";


const App = ({loadUser}) => {
    useEffect(() => {
        setAuthToken(localStorage.token);
        loadUser();
    }, [loadUser]);
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
                        <Route exact={true} path="/profiles" component={Profiles}/>
                        <Route exact={true} path="/profile/:id" component={Profile}/>
                        <PrivateRoute exact={true} path="/dashboard" component={Dashboard}/>
                        <PrivateRoute exact={true} path="/create-profile" component={CreateProfile}/>
                        <PrivateRoute exact={true} path="/edit-profile" component={EditProfile}/>
                        <PrivateRoute exact={true} path="/add-education" component={AddEducation}/>
                        <PrivateRoute exact={true} path="/add-experience" component={AddExperience}/>
                        <PrivateRoute exact={true} path="/posts" component={Posts}/>
                        <PrivateRoute exact={true} path="/posts/:id" component={Post}/>
                        <Route component={NotFound} />
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
export default connect(null, mapDispatchToProps)(App);
