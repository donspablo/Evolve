//Documentation - https://reactrouter.com/web/guides/quick-start

import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Main from "./Main/Main";
import Login from "./Main/Login/Login";
import Register from "./Main/Register/Register";
import NotFound from "./Utils/NotFound";
import ProtectedRoute from "./Utils/ProtectedRoute";
import * as authservice from "./Services/Auth";

export default function Routes() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    authservice
      .verifyToken(
        localStorage.getItem("userID"),
        localStorage.getItem("username")
      )
      .then((res) => {
        isLoading(false);

        if (
          localStorage.getItem("access_token") &&
          localStorage.getItem("userID") &&
          localStorage.getItem("username") &&
          res
        ) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      });
  });

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    authservice.removelocalStorage();
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Switch>
        {/*Sending custom props to Login, Register, Home */}
        <Route
          exact
          path="/"
          render={(props) => (
            <Home isAuthenticated={isAuthenticated} loading={loading} {...props} />
          )}
        />
        <Route
          path="/login"
          render={(props) => (
            <Login isAuthenticated={isAuthenticated} login={login} {...props} />
          )}
        />
        <Route
          path="/register"
          render={(props) => (
            <Register
              isAuthenticated={isAuthenticated}
              login={login}
              {...props}
            />
          )}
        />
        <ProtectedRoute
          path="/dashboard/:name"
          component={Main}
          isAuthenticated={isAuthenticated}
          logout={logout}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
