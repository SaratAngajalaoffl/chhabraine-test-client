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

const useStyles = makeStyles((theme) => ({
	item: {
		margin: '30px',
		backgroundColor: theme.palette.background.paper,
		minHeight: '50px',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
	},
	button: {
		width: '100%',
		height: '100%',
		padding: '10px',
	},
}));

function Song({ song }) {
	const classes = useStyles();
	const playfile = useContext(AudioPlayerContext);

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
			</Paper>
		</>
	);
}

export default Song;
