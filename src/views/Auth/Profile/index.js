import React, { useContext, useState } from 'react';
import AuthContext from 'components/Auth';
import useForm from 'utils/useForm';
import SnackbarContext from 'components/Snackbar';
import {
	Grid,
	Typography,
	TextField,
	Button,
	Avatar,
	Box,
	Card,
	CardContent,
	makeStyles,
	IconButton,
} from '@material-ui/core';
import { uploadFile } from 'utils/firebase_utils';
import { useEffect } from 'react';
import firebase from 'firebase';
import SongComponent from './Song';

const useStyles = makeStyles(() => ({
	root: {},
	avatar: {
		height: 300,
		width: 300,
	},
}));

function ProfileScreen() {
	const classes = useStyles();
	const { auth } = useContext(AuthContext);
	const [imloading, setImloading] = useState(false);

	const [form, HandleChange, HandleChangebyValue, HandleReset] = useForm({
		name: auth.user.displayName,
		imuri: auth.user.photoURL,
	});

	const [likedSongs, setlikedsongs] = useState([]);
	const [songs, setsongs] = useState([]);

	useEffect(() => {
		firebase
			.database()
			.ref(`/Users/${auth.user.uid}/songs`)
			.on('value', (snapshot) => {
				const list = snapshot.val() || [];
				setsongs(list);
			});
		firebase
			.database()
			.ref(`/Users/${auth.user.uid}/likedSongs`)
			.on('value', (snapshot) => {
				const list = snapshot.val() || [];
				setlikedsongs(list);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { openSnackbar } = useContext(SnackbarContext);

	const HandleUploadImage = async (e) => {
		const user = auth.user;
		const im = e.target.files[0];
		try {
			setImloading(true);
			const imuri = await uploadFile(
				im,
				`image-${user.email}-${im.name}`
			);
			HandleChangebyValue({
				...form,
				imuri,
			});
			setImloading(false);
			openSnackbar('Image added successfully', 'success');
		} catch (err) {
			setImloading(false);
			openSnackbar(err.message);
		}
	};

	const HandleSave = async () => {
		await auth.user.updateProfile({
			displayName: form.name,
			photoURL: form.imuri,
		});
		openSnackbar('Details updated Successfully', 'success');
	};

	const CheckValid = () => {
		if (
			form.name === auth.user.displayName &&
			form.imuri === auth.user.photoURL
		)
			return true;
		return false;
	};

	return (
		<Grid
			container
			style={{
				marginTop: '10vh',
			}}
			spacing={5}
			alignItems='center'
			justify='space-around'>
			<Grid
				container
				style={{ backgroundColor: 'white', borderRadius: '20px' }}
				item
				xs={12}
				sm={8}
				md={5}
				spacing={4}
				alignItems='center'
				justify='space-around'>
				<Grid item xs={12}>
					<Typography variant='h3' color='primary'>
						Update Account Information
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Card>
						<CardContent>
							<input
								id='avatarselector'
								style={{ display: 'none' }}
								type='file'
								onChange={HandleUploadImage}
								accept='images/*'
							/>
							<Box
								alignItems='center'
								display='flex'
								flexDirection='column'>
								<IconButton
									aria-label=''
									onClick={() => {
										document
											.querySelector('#avatarselector')
											.click();
									}}>
									{imloading ? (
										'Loading'
									) : (
										<Avatar
											className={classes.avatar}
											src={form.imuri}
											alt='A'
										/>
									)}
								</IconButton>
							</Box>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						id='Name'
						label='Enter Name'
						name='name'
						value={form.name}
						onChange={HandleChange}
					/>
				</Grid>
				<Grid container item xs={12} justify='flex-end'>
					<Button
						variant='contained'
						color='primary'
						onClick={() => HandleReset()}>
						Reset
					</Button>
					<Button
						style={{ marginLeft: '10px' }}
						variant='contained'
						disabled={CheckValid()}
						onClick={HandleSave}
						color='secondary'>
						Update
					</Button>
				</Grid>
			</Grid>
			<Grid
				container
				style={{
					backgroundColor: 'white',
					borderRadius: '20px',
				}}
				item
				xs={12}
				sm={8}
				md={5}
				spacing={4}
				alignItems='center'
				justify='space-around'>
				<Grid item xs={12}>
					<Typography variant='h3' color='primary'>
						My Songs
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					style={{ maxHeight: '40vh', overflowY: 'scroll' }}>
					{songs.map((song) => (
						<Grid item xs={12}>
							<SongComponent song={song} />
						</Grid>
					))}
				</Grid>
				<Grid item xs={12}>
					<Typography variant='h3' color='primary'>
						Liked Songs
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					style={{ maxHeight: '40vh', overflowY: 'scroll' }}>
					{likedSongs.map((song) => (
						<Grid item xs={12}>
							<SongComponent song={song} />
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default ProfileScreen;
