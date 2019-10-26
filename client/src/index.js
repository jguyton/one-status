import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import App from "./App";
import Home from "./views/Home";
import Profile from "./views/Profile";


ReactDOM.render(
  <App>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:username" component={Profile} />
      </Switch>
    </Router>
  </App>,
  document.getElementById("root")
);
