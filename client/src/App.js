import React, {Fragment} from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import About from "./components/About";

const App = () => {
    return (
        <Fragment className="App">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
            </Switch>
        </Fragment>
    );
}

export default App;
