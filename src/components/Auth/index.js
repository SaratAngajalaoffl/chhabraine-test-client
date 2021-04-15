import { createContext, useState } from 'react';
import app from '../../configs/firebase_config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setauth] = useState({
		isauthenticated: false,
		user: null,
		isloading: true,
	});

	const checkuserexists = () => {
		// const user = app.auth().currentUser;
		const user = {};
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
				isloading: true,
			});
		}
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
				checkuserexists();
				resolve();
			} catch (e) {
				checkuserexists();
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
				checkuserexists();
				resolve();
			} catch (e) {
				checkuserexists();
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
				checkuserexists();
				resolve();
			} catch (e) {
				checkuserexists();
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
