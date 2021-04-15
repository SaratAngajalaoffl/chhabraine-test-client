import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import AddSongComponent from './AddSong';
import SongComponent from './Song';
import firebase from 'firebase';
import { useContext } from 'react';
import SnackbarContext from 'components/Snackbar';
import { Paper, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	item: {
		marginTop: '20px',
		background: 'transparent',
		color: 'white !important',
		width: '100%',
	},
	root: {
		width: '96%',
	},
}));

function Dashboard() {
	const classes = useStyles();
	const [songs, setsongs] = useState([]);
	const [searchtext, setsearchtext] = useState('');
	const [displaysongs, setDisplaysongs] = useState([]);
	const { openSnackbar } = useContext(SnackbarContext);
	const [loading, setloading] = useState(true);

	const fetchsongs = () => {
		setloading(true);
		firebase
			.database()
			.ref('/Songs/')
			.once('value')
			.then((data) => {
				if (data.val()) {
					setsongs(data.val());
				} else {
					openSnackbar('No Songs Available!');
				}
				setloading(false);
			})
			.catch((err) => {
				openSnackbar(err.message);
				setloading(false);
			});
	};

	useEffect(() => {
		fetchsongs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setloading(true);
		var list = songs;
		if (searchtext.length > 3) {
			const text = searchtext.toUpperCase();
			list = list.filter((song) => {
				const text2 = `${song.user} ${song.name}`.toUpperCase();
				return text2.indexOf(text) > -1;
			});
		}
		list = list.slice(0, 25);
		setDisplaysongs(list);
		setloading(false);
	}, [songs, searchtext]);

	return (
		<List className={classes.root}>
			<Paper className={classes.item} elevation={3}>
				<TextField
					fullWidth
					InputLabelProps={{
						style: {
							color: 'white',
						},
					}}
					inputProps={{
						style: {
							color: 'white',
						},
					}}
					value={searchtext}
					label='Search Song'
					onChange={(e) => setsearchtext(e.target.value)}
				/>
			</Paper>
			<AddSongComponent fetchsongs={fetchsongs} />
			{loading ? (
				'Loading'
			) : (
				<>
					{displaysongs.map((song) => (
						<SongComponent song={song} fetchsongs={fetchsongs} />
					))}
				</>
			)}
		</List>
	);
}

export default Dashboard;
