import firebase from 'firebase/app';
import 'firebase/auth';

console.log(process.env);

const app = firebase.initializeApp({
	apiKey: 'AIzaSyAJtMViaEL8gwrvwpt1Zf3Bi-f0kk7zmjM',
	authDomain: 'chhabraine.firebaseapp.com',
	databaseURL: 'https://chhabraine-default-rtdb.firebaseio.com',
	projectId: 'chhabraine',
	storageBucket: 'chhabraine.appspot.com',
	messagingSenderId: '623387096212',
	appId: '1:623387096212:web:9837ca97e7d5dbb1517081',
});

export default app;
