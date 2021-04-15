import React from 'react';

function RedirectHandler() {
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
}

export default RedirectHandler;
