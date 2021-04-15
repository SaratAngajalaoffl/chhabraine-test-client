import firebase from 'firebase';
// import app from 'configs/firebase_config';

const uploadImage = (image, ininame) => {
	return new Promise(async (resolve, reject) => {
		try {
			let name = ininame || image.name;
			const ref = firebase.storage().ref().child(name).put(image);
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

export { uploadImage };
