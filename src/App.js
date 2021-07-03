import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthWrapper, Dashboard, Error, Login, PrivateRoute } from "./pages";
import { project } from "./ProjectProperties";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Switch>
          <PrivateRoute path={project.nav.dashboard} exact>
            <Dashboard></Dashboard>
          </PrivateRoute>
          <Route path={project.nav.login}>
            <Login />
          </Route>
          <Route path={project.nav.error}>
            <Error />
          </Route>
        </Switch>
      </Router>
    </AuthWrapper>
  );
}

export default App;
