import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { project } from './ProjectProperties';

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
