import { useContext, useEffect, useState } from "react";
import { irepsIcons } from "../../utils/utils";
import "./MediaMobileBody.css";
import MediaMBBtn from "./MediaMBBtn";
import MediaMBImg from "./MediaMBImg";
import MediaMBMap from "./MediaMBMap";
import { useFirestore } from "../../hooks/useFirestore";
import useStorage from "../../hooks/useStorage";
import { ref } from "firebase/storage";
import { storage } from "../../firebaseConfig/fbConfig";
import { toast } from "react-toastify";
import { MediaContext } from "../../contexts/MediaContext";

const MediaMobileBody = () => {
	const { mediaData, setMediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);

	const [activeWindow, setActiveWindow] = useState("image");
	console.log(`activeWindow`, activeWindow);

	const selectWindow = selected => {
		setActiveWindow(selected);
	};

	// Delete file - step 0
	const { deleteDocument, response } = useFirestore("media");

	// Delete file - step 1
	const { deleteFile, success } = useStorage();

	// Delete file - step 2
	const selectedMedia = mediaData?.data[mediaData?.displayPosition];
	// console.log(`selectedMedia`, selectedMedia);

	// Delete file - step 3
	const handleDelete = async e => {
		console.log(`e`, e);
		console.log(`image to delete [${e}]`);
		const id = e;

		// get image ref from url
		try {
			// console.log(`storage`, storage);
			let imageRef = ref(storage, selectedMedia.url);
			// console.log(`imageRef`, imageRef);
			await deleteFile(imageRef, selectedMedia.id);
			await deleteDocument(id);
			setMediaData({
				...mediaData,
				displayPosition: 0,
			});
		} catch (error) {
			console.log(`Error deleting image ${error}`);
			toast.error(`Error deleting image ${error}`, {
				position: "top-right",
			});
		}
	};
	// Delete file - step 3
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
		<div className="media-mobile-body">
			<div className="mmb-main">
				{activeWindow === "image" && <MediaMBImg />}
				{activeWindow === "map" && <MediaMBMap />}
			</div>
			<div className="mmb-btns">
				{selectedMedia && (activeWindow !== 'map') && (
					<MediaMBBtn
						id={selectedMedia?.id}
						selectWindow={handleDelete}
						mmbIcon={irepsIcons.ICON_DELETE}
						color={""}
						label={selectedMedia?.id}
						title={"DELETE Image"}
					/>
				)}

				<MediaMBBtn
					id={"images"}
					selectWindow={selectWindow}
					mmbIcon={irepsIcons.ICON_IMAGE1}
					color={""}
					label={"image"}
					title={"VIEW Image"}
				/>
				<MediaMBBtn
					id={"map"}
					selectWindow={selectWindow}
					mmbIcon={irepsIcons.ICON_MAP}
					color={""}
					label={"map"}
					title={"VIEW Image Location On The Map "}
				/>
			</div>
		</div>
	);
};

export default MediaMobileBody;
