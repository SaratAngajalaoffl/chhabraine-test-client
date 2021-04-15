import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useContext } from 'react';
import AudioPlayerContext from 'components/AudioPlayer';
import {
	IconButton,
	Table,
	TableBody,
	TableRow,
	TableCell,
} from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayArrow';
import Favourite from '@material-ui/icons/FavoriteOutlined';
import firebase from 'firebase';
import AuthContext from 'components/Auth';
import SnackbarContext from 'components/Snackbar';

const useStyles = makeStyles((theme) => ({
	item: {
		marginTop: '20px',
		backgroundColor: theme.palette.background.paper,
		width: '100%',
		minHeight: '50px',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	button: {
		width: '100%',
		height: '100%',
		padding: '10px',
	},
}));

function Song({ song, fetchsongs }) {
	const classes = useStyles();
	const playfile = useContext(AudioPlayerContext);
	const { auth } = useContext(AuthContext);
	const { openSnackbar } = useContext(SnackbarContext);

	const HandleFavourite = () => {
		firebase
			.database()
			.ref(`/Users/${auth.user.uid}/likedSongs/`)
			.once('value')
			.then((data) => {
				var songs = data.val() || [];
				songs = songs.filter((s) => s.name !== song.name);
				if (data.val()?.length && songs.length !== data.val()?.length) {
					firebase
						.database()
						.ref(`/Users/${auth.user.uid}/likedSongs/`)
						.set(songs)
						.then(() => {
							openSnackbar(
								'Song Removed from Liked Songs!',
								'info'
							);
						})
						.catch((err) => {
							openSnackbar(err.message);
						});
				} else {
					songs.push(song);
					firebase
						.database()
						.ref(`/Users/${auth.user.uid}/likedSongs/`)
						.set(songs)
						.then(() => {
							openSnackbar('Added to Liked Songs!', 'success');
						})
						.catch((err) => {
							openSnackbar(err.message);
						});
				}
			})
			.catch((err) => {
				openSnackbar(err.message);
			});
	};

	return (
		<>
			<Paper className={classes.item} elevation={3}>
				<div style={{ margin: '10px', textAlign: 'left' }}>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>Song</TableCell>
								<TableCell>{song.name}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>By</TableCell>
								<TableCell>{song.user}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
				<div style={{ flexGrow: 1 }}></div>
				<IconButton
					style={{ marginRight: '20px', width: 50, height: 50 }}
					aria-label=''
					onClick={() => playfile(song)}>
					<PlayIcon />
				</IconButton>
				<IconButton
					style={{ marginRight: '20px', width: 50, height: 50 }}
					aria-label=''
					onClick={() => HandleFavourite()}>
					<Favourite />
				</IconButton>
			</Paper>
		</>
	);
}

export default Song;
