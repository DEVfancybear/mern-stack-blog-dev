import React, { Fragment } from "react";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact={true} path="/" component={Landing} />
        <section className="container">
          <Switch>
            <Route exact={true} path="/register" component={Register} />
            <Route exact={true} path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
