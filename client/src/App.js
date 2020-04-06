import React, {Fragment} from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import './App.css';
import About from "./components/About";
import Login from "./components/Login";
const App = () => {
    return (
        <Fragment className="App">
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/about" component={About}/>
            </Switch>
        </Fragment>
    );
}

export default App;
