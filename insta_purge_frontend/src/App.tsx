import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export class App extends Component {
  isUserAuthenticated: any = true;

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                //TODO add cached authentication?
                return !this.isUserAuthenticated ? (
                  <Redirect to="/login" />
                ) : (
                  <Redirect to="/dashboard" />
                );
              }}
            />

            <Route path="/login"> in login {/* <About /> */}</Route>
            <Route path="/dashboard"> in dashboard {/* <Users /> */}</Route>
            <Route path="/register">{/* <Home /> */}</Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
