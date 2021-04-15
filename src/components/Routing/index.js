import React, { useEffect, useContext } from 'react';
import AuthContext from '../Auth';
import SnackbarContext from '../Snackbar';

function MainRoutingHandler() {
	const { openSnackbar } = useContext(SnackbarContext);

	const { auth, checkuserexists } = useContext(AuthContext);

	useEffect(() => {
		checkuserexists();
	}, []);


	return (
		<button
			onClick={() =>
				openSnackbar('User Successfully Logged In!', 'warning')
			}>
			Press Me!
		</button>
	);
}

export default MainRoutingHandler;
