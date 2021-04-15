import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { ButtonBase } from '@material-ui/core';
import AuthContext from 'components/Auth';
import SnackbarContext from 'components/Snackbar';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'fixed',
		width: '99%',
		top: '10px',
	},
	AppBar: {
		backgroundColor: '#206a5d',
		backgroundSize: 'cover',
	},
	signup: {
		color: 'white',
	},
	logo: {
		borderRadius: '50%',
		height: '40px',
	},
	mainMenu: {
		backgroundColor: '#206a5d',
		color: 'white',
		marginRight: '10px',
		'&:hover': {
			background: '#d49a89',
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {},
}));

export default function Navbar() {
	const classes = useStyles();

	const { logout } = useContext(AuthContext);

	const { openSnackbar } = useContext(SnackbarContext);
	const history = useHistory();

	const HandleLogout = async () => {
		try {
			await logout();
			openSnackbar('User Logged Out Successfully', 'success', 4000);
			history.push('/login');
		} catch (err) {
			openSnackbar(err.message, 'error', 4000);
		}
	};

	return (
		<div className={classes.root}>
			<AppBar className={classes.AppBar} position='static'>
				<Toolbar>
					<ButtonBase
						component={Typography}
						variant='h6'
						className={classes.title}>
						Logo
					</ButtonBase>
					<div style={{ flexGrow: 1 }}></div>
					<div>
						<IconButton
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							color='inherit'>
							<AccountCircle />
						</IconButton>
						<IconButton
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={HandleLogout}
							color='inherit'>
							<ExitToAppIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}
