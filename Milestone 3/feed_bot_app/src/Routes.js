import React from "react";
import { Route, Switch } from "react-router-dom";
import { Forms, Triggers, Analysis, About, Settings } from "./components";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Forms} />
    <Route path="/triggers" component={Triggers} />
    <Route path="/analysis" component={Analysis} />
    <Route path="/about" component={About} />
    <Route path="/settings" component={Settings} />
  </Switch>
);

export default Routes;
