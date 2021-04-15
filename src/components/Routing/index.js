import AuthContext from 'components/Auth';
import React from 'react';
import { useContext } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import ProfileScreen from 'views/Auth/Profile';
import LoginScreen from '../../views/NoAuth/Login';
import SignUpScreen from '../../views/NoAuth/SignUp';
import Navbar from '../Navbar';

const AuthRoutingHandler = () => {
	let { path } = useRouteMatch();

	const { auth } = useContext(AuthContext);

	if (!auth.isauthenticated) return <Redirect to='/login' />;

	return (
		<>
			<Navbar />
			<Route exact path={`${path}`} component={ProfileScreen} />
		</>
	);
};

const NoAuthRoutingHandler = () => {
	let { path } = useRouteMatch();

	const { auth } = useContext(AuthContext);

	if (auth.isauthenticated) return <Redirect to='/profile' />;

	return (
		<>
			<Route exact path={`${path}`}>
				<Redirect to='/login' />
			</Route>
			<Route exact path={`/login`} component={LoginScreen} />
			<Route exact path={`/signup`} component={SignUpScreen} />
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
