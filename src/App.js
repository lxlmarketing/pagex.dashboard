import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Screens
import Reset from "./screens/reset/index";
import Home from "./screens/home/index";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="*">
          <Reset />
        </Route>
        {/* <Route path="/">
          <Home />
        </Route> */}
      </Switch>
    </Router>
  );
};

export default App;
