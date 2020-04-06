import React, {Fragment} from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import './App.css';
import About from "./components/About";
import Login from "./components/Login";
import Home from "./components/Home";
const App = () => {
    return (
        <Fragment className="App">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/about" component={About}/>
            </Switch>
        </Fragment>
    );
}

export default App;
