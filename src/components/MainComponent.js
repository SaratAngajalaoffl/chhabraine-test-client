import logo from '../logo.svg';
import { Typography } from '@material-ui/core';
import React, { useEffect, useContext } from 'react';
import AuthContext from './Auth';
import MainRoutingHandler from './Routing';

function MainComponent() {
	const { auth, checkuserexists } = useContext(AuthContext);

	useEffect(() => {
		checkuserexists();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (auth.isloading)
		return (
			<>
				<img src={logo} className='App-logo' alt='logo' />
				<Typography variant='h1'>Loading</Typography>
			</>
		);

	return (
		<>
			<MainRoutingHandler />
		</>
	);
}

export default MainComponent;
