import { useEffect, useState } from "react";
import { storage } from "../firebaseConfig/fbConfig";
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadString,
} from "firebase/storage";
import { useFirestore } from "./useFirestore";
import { toast } from "react-toastify";
import { Timestamp } from "firebase/firestore";

const useStorage = props => {
	// console.log(`props`, props);

	const [progress, setProgress] = useState(null);
	const [error, setError] = useState(null);
	const [url, setUrl] = useState(null);
	const [success, setSuccess] = useState(null);

	const { addDocument, response } = useFirestore("media");

	useEffect(() => {
		if (response.success) {
			toast.success(`Media succesfully uploade onto iREPS`, {
				position: "bottom-left",
			});
		}
		if (response.error) {
			// console.log(`response.error`, response.error);
			toast.error(`Media Failed to uploade onto iREPS`, {
				position: "top-right",
			});
		}
	}, [response]);

	const uploadFile = async (file, irepsKeyItem, id, imgMetadata) => {
		// console.log(`file`, file);
		// console.log(`imgMetadata`, imgMetadata);
		// mediaCatergory - ['erf', 'ast']
		// imageCatergory - ['erfPhoto', 'astNo','']
		// timestamp - "yyyy-MMM-dd_HH:mm:ss"
		// id = ['erfId', 'astsId']

		let filePath = null;
		if (irepsKeyItem === "erfs") {
			filePath = `${irepsKeyItem}/${id}_${props?.erfNo}/${imgMetadata?.mediaCategory}_${imgMetadata?.createdAtDatetime}`;
		}
		if (irepsKeyItem === "asts") {
			filePath = `${irepsKeyItem}/${id}_${props?.astNo}/${imgMetadata?.mediaCategory}_${imgMetadata?.createdAtDatetime}`;
		}

		const fileStorageRef = ref(storage, filePath);

		const metadata = {
			customMetadata: {
				mediaType: imgMetadata.mediaType,
				mediaCategory: imgMetadata.mediaCategory,
				erfId: imgMetadata.erfId,
				erfNo: imgMetadata.erfNo,

				lat: imgMetadata.createdAtLocation.lat,
				lng: imgMetadata.createdAtLocation.lng,
			},
		};

		// Upload file and metadata to the object 'images/mountains.jpg'
		const storageRef = ref(storage, fileStorageRef);

		const snapshot = await uploadString(storageRef, file, "data_url", metadata);
		// console.log("Uploaded a data_url string!", snapshot);

		const downloadURL = await getDownloadURL(snapshot.ref);
		// console.log("File available at", downloadURL);
		setUrl(downloadURL);
		addDocument({
			url: downloadURL,
			metadata: {
				...metadata.customMetadata,
				createdByUser: imgMetadata.createdByUser,
				createdByUserId: imgMetadata.createdByUserId,
				createdAtDatetime: Timestamp.now(),
			},
		});

		// const uploadTask = uploadBytesResumable(storageRef, file, metadata);

		// Listen for state changes, errors, and completion of the upload.
		// uploadTask.on(
		// 	"state_changed",
		// 	snapshot => {
		// 		// console.log("snapshot", snapshot);
		// 		// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
		// 		const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		// 		// console.log("Upload is " + progress + "% done");
		// 		// const metadata = snapshot?.metadata;
		// 		// console.log("metadata", metadata);
		// 		setProgress(progress);
		// 	},
		// 	error => {
		// 		setError(error.code);
		// 		// A full list of error codes is available at
		// 		// https://firebase.google.com/docs/storage/web/handle-errors
		// 	},
		// 	() => {
		// 		// Upload completed successfully, now we can get the download URL
		// 		getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
		// 			// console.log("File available at", downloadURL);
		// 			setUrl(downloadURL);
		// 			addDocument({
		// 				url: downloadURL,
		// 				metadata: {
		// 					...metadata.customMetadata,
		// 					createdByUser: imgMetadata.createdByUser,
		// 					createdByUserId: imgMetadata.createdByUserId,
		// 					createdAtDatetime: Timestamp.now(),
		// 				},
		// 			});
		// 		});
		// 	}
		// );
	};

	const deleteFile = async (fileRef, id) => {
		console.log(`fileRef`, fileRef);
	// 	console.log(`id`, id);

	// 	// Delete the file
		deleteObject(fileRef)
			.then(() => {
				console.log(`File ${id} deleted successfully`);
				setSuccess(true);
			})
			.catch(error => {
				console.log(`Error deleting file ${id} : ${error.message}`);
				setError(`Error deleting file ${id} : ${error.message}`);
			});
	};

	return { uploadFile, progress, error, url, deleteFile,  success };
};

export default useStorage;
