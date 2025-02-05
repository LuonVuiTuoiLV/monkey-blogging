import {
	deleteObject,
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';
import { useState } from 'react';

export default function useFirebaseImage(
	setValue,
	getValues,
	imageName = null,
	cb = null
) {
	const [progress, setProgress] = useState(0);
	const [image, setImage] = useState('');

	if (!setValue || !getValues) return;

	const handleUploadImage = (file) => {
		const storage = getStorage();

		const metadata = {
			contentType: 'image/jpeg',
		};

		const storageRef = ref(storage, 'images/' + file.name);
		const uploadTask = uploadBytesResumable(storageRef, file, metadata);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progressPercent =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setProgress(progressPercent);
				switch (snapshot.state) {
					case 'paused':
						console.log('Upload is paused');
						break;
					case 'running':
						console.log('Upload is running');
						break;
					default:
						console.log('Nothing at all');
				}
			},
			(error) => {
				console.log(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImage(downloadURL);
				});
			}
		);
	};

	const handleSelectImage = (e) => {
		const file = e.target.files[0];
		if (!file) return;
		setValue('image_name', file.name);
		handleUploadImage(file);
	};

	const handleDeleteImage = () => {
		const storage = getStorage();

		const desertRef = ref(
			storage,
			'images/' + (imageName || getValues('image_name'))
		);

		deleteObject(desertRef)
			.then(() => {
				console.log('Remove image successfully');
				setImage('');
				setProgress(0);
				cb && cb();
			})
			.catch((error) => {
				console.log('Can not delete image');
				setImage('');
			});
	};
	const handleResetUpload = () => {
		setImage('');
		setProgress(0);
	};
	return {
		image,
		setImage,
		handleResetUpload,
		progress,
		handleSelectImage,
		handleDeleteImage,
	};
}
