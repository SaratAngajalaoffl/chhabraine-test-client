import firebase from 'firebase';
// import app from 'configs/firebase_config';

const uploadFile = (file, ininame) => {
	return new Promise(async (resolve, reject) => {
		try {
			let name = ininame || file.name;
			const ref = firebase.storage().ref().child(name).put(file);
			ref.on(
				'state_changed',
				() => {},
				() => {},
				() => {
					firebase
						.storage()
						.ref()
						.child(name)
						.getDownloadURL()
						.then((url) => {
							resolve(url);
						});
				}
			);
		} catch (err) {
			reject(err);
		}
	});
};

export { uploadFile };
