import { AudioPlayerProvider } from 'components/AudioPlayer';
import AuthContext from 'components/Auth';
import React from 'react';
import { useContext } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Dashboard from 'views/Auth/Dashboard';
import ProfileScreen from 'views/Auth/Profile';
import LoginScreen from '../../views/NoAuth/Login';
import SignUpScreen from '../../views/NoAuth/SignUp';
import Navbar from '../Navbar';

const AuthRoutingHandler = () => {
	let { path } = useRouteMatch();

	const { auth } = useContext(AuthContext);

	if (!auth.isauthenticated) return <Redirect to='/login' />;

	return (
		<AudioPlayerProvider>
			<Navbar />
			<Switch>
				<Route exact path={`${path}`} component={ProfileScreen} />
				<Route exact path={`${path}/dashboard`} component={Dashboard} />
			</Switch>
		</AudioPlayerProvider>
	);
};

const NoAuthRoutingHandler = () => {
	let { path } = useRouteMatch();

	const { auth } = useContext(AuthContext);

	if (auth.isauthenticated) return <Redirect to='/profile' />;

	return (
		<>
			<Switch>
				<Route exact path={`${path}`}>
					<Redirect to='/login' />
				</Route>
				<Route exact path={`/login`} component={LoginScreen} />
				<Route exact path={`/signup`} component={SignUpScreen} />
			</Switch>
		</>
	);
};

function MainRoutingHandler() {
	return (
		<Switch>
			<Route path='/profile' component={AuthRoutingHandler} />
			<Route path='/' component={NoAuthRoutingHandler} />
		</Switch>
	);
}

export default MainRoutingHandler;
