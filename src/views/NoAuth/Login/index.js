import React from 'react';
import useForm from '../../../utils/useForm';
import {
	Grid,
	Typography,
	TextField,
	Divider,
	Button,
} from '@material-ui/core';
import AuthContext from 'components/Auth';
import SnackbarContext from 'components/Snackbar';
import { useContext } from 'react';
import { useHistory } from 'react-router';

function LoginScreen() {
	const [form, HandleChange] = useForm({
		email: '',
		password: '',
	});

	const { login } = useContext(AuthContext);

	const { openSnackbar } = useContext(SnackbarContext);

	const history = useHistory();

	const HandleLogin = async () => {
		try {
			await login(form.email, form.password);
			openSnackbar('User logged in Successfully', 'success', 4000);
			history.push('/profile');
		} catch (err) {
			openSnackbar(err.message, 'error', 4000);
		}
	};

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Grid
				container
				style={{ width: '90%' }}
				alignItems='center'
				justify='space-around'>
				<Grid
					container
					style={{ backgroundColor: 'white', borderRadius: '20px' }}
					item
					xs={12}
					sm={8}
					md={6}
					lg={4}
					spacing={4}
					alignItems='center'
					justify='space-around'>
					<Grid item xs={12}>
						<Typography variant='h3' color='primary'>
							Login
						</Typography>
					</Grid>
					<Divider />
					<Grid item xs={12}>
						<TextField
							fullWidth
							id='email'
							label='Enter Email'
							name='email'
							value={form.email}
							onChange={HandleChange}
						/>
					</Grid>
					<Divider />
					<Grid item xs={12}>
						<TextField
							fullWidth
							name='password'
							id='password'
							type='password'
							label='Enter Password'
							value={form.password}
							onChange={HandleChange}
						/>
					</Grid>
					<Divider />
					<Grid container item xs={12} justify='flex-end'>
						<Button
							variant='contained'
							color='primary'
							onClick={HandleLogin}>
							Login
						</Button>
						<Button
							style={{ marginLeft: '10px' }}
							variant='contained'
							onClick={() => history.push('/signup')}
							color='secondary'>
							SignUp
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default LoginScreen;
