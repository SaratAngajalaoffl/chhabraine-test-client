import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { uploadFile } from 'utils/firebase_utils';
import useForm from 'utils/useForm';
import { useContext } from 'react';
import AuthContext from 'components/Auth';
import SnackbarContext from 'components/Snackbar';
import { Grid } from '@material-ui/core';
import firebase from 'firebase';

const useStyles = makeStyles((theme) => ({
	item: {
		marginTop: '20px',
		backgroundColor: theme.palette.background.paper,
		width: '100%',
	},
	button: {
		width: '100%',
		height: '100%',
		padding: '10px',
	},
}));

function AddPost({ fetchsongs }) {
	const { auth } = useContext(AuthContext);
	const { openSnackbar } = useContext(SnackbarContext);

	const classes = useStyles();
	const [form, HandleChange, HandleChangebyValue] = useForm({
		name: '',
		audiouri: '',
	});
	const [isdialogopen, setIsdialogopen] = useState(false);
	const [audioloading, setaudioloading] = useState(false);

	const HandleUploadAudio = async (e) => {
		const user = auth.user;
		const audio = e.target.files[0];
		try {
			setaudioloading(true);
			const audiouri = await uploadFile(
				audio,
				`audio-${user.email}-${audio.name}`
			);
			HandleChangebyValue({
				...form,
				audiouri,
			});
			setaudioloading(false);
			openSnackbar('Audio added successfully', 'success');
		} catch (err) {
			setaudioloading(false);
			openSnackbar(err.message);
		}
	};

	const HandleSubmit = () => {
		if (form.name.length < 4) {
			openSnackbar(
				'Length of Audio Name must be greater than 3 characters!'
			);
			return;
		}

		const song = {
			name: form.name,
			uri: form.audiouri,
			user: auth.user.displayName,
		};

		firebase
			.database()
			.ref(`Users/${auth.user.uid}/songs`)
			.once('value')
			.then((data) => {
				var songs = data.val() || [];
				songs.push(song);
				firebase
					.database()
					.ref(`Users/${auth.user.uid}/songs`)
					.set(songs)
					.then(() => {
						setIsdialogopen(false);
						openSnackbar(
							'Song has been posted successfully!',
							'success'
						);
						fetchsongs();
					})
					.catch((err) => {
						openSnackbar(err.message);
					});
			})
			.catch((err) => {
				openSnackbar(err.message);
			});

		firebase
			.database()
			.ref('Songs/')
			.once('value')
			.then((data) => {
				var songs = data.val() || [];
				songs.push(song);
				firebase
					.database()
					.ref('Songs/')
					.set(songs)
					.then(() => {
						setIsdialogopen(false);
						openSnackbar(
							'Song has been posted successfully!',
							'success'
						);
						fetchsongs();
					})
					.catch((err) => {
						openSnackbar(err.message);
					});
			})
			.catch((err) => {
				openSnackbar(err.message);
			});
	};

	return (
		<React.Fragment>
			<Dialog
				open={isdialogopen}
				onClose={() => {
					setIsdialogopen(false);
				}}
				aria-labelledby='form-dialog-title'>
				<DialogTitle id='form-dialog-title'>ADD A NEW SONG</DialogTitle>
				<DialogContent>
					<input
						id='audioselector'
						style={{ display: 'none' }}
						type='file'
						onChange={HandleUploadAudio}
						accept='audio/*'
						required
					/>
					<Grid container alignItems='center'>
						<Grid container item xs={12} alignItems='center'>
							<Grid item xs={10}>
								{audioloading ? (
									'Loading'
								) : (
									<audio controls>
										<source
											src={form.audiouri}
											type='audio/ogg'
										/>
									</audio>
								)}
							</Grid>
							<Grid item xs={2}>
								<Button
									variant='contained'
									color='primary'
									onClick={() => {
										document
											.querySelector('#audioselector')
											.click();
									}}>
									Add
								</Button>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<TextField
								value={form.name}
								onChange={HandleChange}
								margin='dense'
								label='Audio Name'
								name='name'
								required
								fullWidth
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button color='primary' onClick={() => HandleSubmit()}>
						Post Song
					</Button>
				</DialogActions>
			</Dialog>
			<Paper className={classes.item} elevation={3}>
				<ButtonBase
					className={classes.button}
					onClick={() => setIsdialogopen(true)}>
					Add a New Song
					<AddIcon style={{ marginLeft: '10px' }} />
				</ButtonBase>
			</Paper>
		</React.Fragment>
	);
}

export default AddPost;
