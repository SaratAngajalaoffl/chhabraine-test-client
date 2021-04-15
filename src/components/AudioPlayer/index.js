import { makeStyles } from '@material-ui/core';
import { createContext, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

const AudioPlayerContext = createContext();

const useStyles = makeStyles(() => ({
	root: {
		position: 'absolute',
		bottom: '10px',
		backgroundColor: 'white',
		width: '99%',
	},
	audioplayer: {
		width: '99%',
		alignSelf: 'start',
		border: '2px solid black',
	},
	songdetails: {
		margin: '10px',
		fontSize: '20px',
		width: '90%',
		textAlign: 'left',
	},
}));

const AudioPlayerProvider = ({ children }) => {
	const [song, playfile] = useState(null);
	const classes = useStyles();

	return (
		<AudioPlayerContext.Provider value={playfile}>
			{children}
			{song ? (
				<div className={classes.root}>
					<div className={classes.songdetails}>
						{song.name}, by {song.user}
					</div>
					<ReactAudioPlayer
						id='player'
						src={song.uri}
						className={classes.audioplayer}
						controls
						loop={true}
						autoPlay={true}></ReactAudioPlayer>
				</div>
			) : null}
		</AudioPlayerContext.Provider>
	);
};

export { AudioPlayerProvider };

export default AudioPlayerContext;
