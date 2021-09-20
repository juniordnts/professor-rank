import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Department from "./pages/Department";

import firebase from "./config/firebase";

const analytics = firebase.analytics();

function App() {
  return (
    <Router basename="/professor-rank/front">
      <Switch>
        <Route path="/departamento/:departmentKey">
          <Department />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
