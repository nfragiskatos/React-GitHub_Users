import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Dashboard, Error, Login } from "./pages";
import { project } from "./ProjectProperties";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={project.nav.dashboard} exact>
          <Dashboard></Dashboard>
        </Route>
        <Route path={project.nav.login}>
          <Login />
        </Route>
        <Route path={project.nav.error}>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
