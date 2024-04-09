import { useContext, useEffect, useState } from "react";
import MadiaMainDisplayHeader from "./MediaMainDisplayHeader";
import "./MediaMainDisplay.css";
import { ref } from "firebase/storage";
import { storage } from "../../firebaseConfig/fbConfig";
import { MediaContext } from "../../contexts/MediaContext";
import { format } from "date-fns";
import { constants } from "../../utils/utils";
import { IconContext } from "react-icons";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";import { useFirestore } from "../../hooks/useFirestore";
import useStorage from "../../hooks/useStorage";
;
// import { ref } from "firebase/storage";
// import useStorage from "../../hooks/useStorage";

const MediaMainDisplay = () => {
	const { mediaData, setMediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);

	const { deleteDocument, response } = useFirestore("media");

	const { deleteFile, success } = useStorage();

	const selectedMedia = mediaData?.data[mediaData?.displayPosition];
	// console.log(`selectedMedia`, selectedMedia);

	const src = mediaData?.data[mediaData?.displayPosition]?.url;
	const alt = mediaData?.data?.metadata?.mediaCatergory;

	const createdByUser =
		mediaData?.data[mediaData?.displayPosition]?.metadata?.createdByUser;
	const timestamp =
		mediaData?.data[mediaData?.displayPosition]?.metadata?.createdAtDatetime;
	// console.log(`timestamp`, timestamp);
	let createdAtDatetime = "";
	if (timestamp) {
		createdAtDatetime = format(timestamp?.toDate(), constants.dateFormat2);
		// console.log(`createdAtDatetime`, createdAtDatetime);
	}

	const handleDelete = async e => {
		// console.log(`image to delte [${e.currentTarget.id}]`);
		const id = e.currentTarget.id;

		// get image ref from url
		try {
			// console.log(`storage`, storage);
			let imageRef = ref(storage, selectedMedia.url);
			// console.log(`imageRef`, imageRef);
			await deleteFile(imageRef, selectedMedia.id);
			await deleteDocument(id);
			setMediaData({
				...mediaData,
				displayPosition: 0
			})
		} catch (error) {
			console.log(`Error deleting image ${error}`);
			toast.error(`Error deleting image ${error}`, {
				position: "top-right",
			});
		}
	};

	useEffect(() => {
		if (response.error) {
			toast.error(response.error, {
				position: "top-right",
			});
		}
		if (response.document && success) {
			toast.success(`Doc ${response.document} succesfully delete`, {
				position: "bottom-left",
			});
		}
	}, [response, success]);

	return (
		<div className="media-main-display">
			<MadiaMainDisplayHeader hl1={createdByUser} hr3={createdAtDatetime} />

			<div className="main-display-container">
				{mediaData?.data?.length ? (
					<div className="image">
						<img src={src} alt={alt} width={"100%"} height={"100%"} />
					</div>
				) : (
					<p>No Image</p>
				)}
			</div>
			{/* mmd - media main display */}
			{selectedMedia && (
				<button
					id={selectedMedia?.id}
					className="mmd-delete-btn"
					onClick={handleDelete}
				>
					<IconContext.Provider
						value={{ color: "blue", className: "global-class-name" }}
					>
						<MdDeleteOutline />
					</IconContext.Provider>
				</button>
			)}
		</div>
	);
};
export default MediaMainDisplay;
