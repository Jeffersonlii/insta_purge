import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Signin from "./pages/signin/Signin";
import { Dashboard } from "./pages/dashboard/dashboard";

export class App extends Component {
  isUserAuthenticated: any = false;

  componentDidMount() {
    //look in cache if user auth
  }

  componentWillUnmount() {}

  render() {
    return (
      <Router>
        <div className="masterWrapper">
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
            <Route path="/login">
              <Signin />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/register">{/* <Home /> */}</Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
