import { createContext, useState } from 'react';
import app from '../../configs/firebase_config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setauth] = useState({
		isauthenticated: false,
		user: null,
		isloading: false,
	});

	const checkuserexists = () => {
		setauth({
			isauthenticated: false,
			user: null,
			isloading: true,
		});
		app.auth().onAuthStateChanged((user) => {
			if (user) {
				setauth({
					isauthenticated: true,
					user: user,
					isloading: false,
				});
			} else {
				setauth({
					isauthenticated: false,
					user: null,
					isloading: false,
				});
			}
		});
	};

	const login = (email, password) => {
		return new Promise(async (resolve, reject) => {
			try {
				setauth({
					isauthenticated: false,
					user: null,
					isloading: true,
				});
				await app.auth().signInWithEmailAndPassword(email, password);
				resolve();
			} catch (e) {
				setauth({
					isauthenticated: false,
					user: null,
					isloading: false,
				});
				reject(e);
			}
		});
	};

	const logout = () => {
		return new Promise(async (resolve, reject) => {
			try {
				setauth({
					isauthenticated: false,
					user: null,
					isloading: true,
				});
				await app.auth().signOut();
				resolve();
			} catch (e) {
				setauth({
					isauthenticated: false,
					user: null,
					isloading: false,
				});
				reject(e);
			}
		});
	};

	const signup = (email, password) => {
		return new Promise(async (resolve, reject) => {
			try {
				setauth({
					isauthenticated: false,
					user: null,
					isloading: true,
				});
				await app
					.auth()
					.createUserWithEmailAndPassword(email, password);
				resolve();
			} catch (e) {
				setauth({
					isauthenticated: false,
					user: null,
					isloading: false,
				});
				reject(e);
			}
		});
	};

	return (
		<AuthContext.Provider
			value={{ auth, checkuserexists, login, logout, signup }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider };

export default AuthContext;
