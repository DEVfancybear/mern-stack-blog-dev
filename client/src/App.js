import React, {Suspense} from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import './App.css';
import About from "./components/About";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Auth from "./hoc/auth";
const App = () => {
    return (
        <Suspense>
            <Switch>
                <Route exact path="/" component={Auth(Home,null)}/>
                <Route exact path="/login" component={Auth(Login,false)}/>
                <Route exact path="/about" component={Auth(About,false)}/>
                <Route exact path="/register" component={Auth(Register,false)}/>
            </Switch>
        </Suspense>
    );
}

export default App;
