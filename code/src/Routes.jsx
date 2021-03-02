//Documentation - https://reactrouter.com/web/guides/quick-start

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Main from "./Main/Main";

export default function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Main} />
      </Switch>
    </BrowserRouter>
  );
};
