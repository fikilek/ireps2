import { useContext } from "react";
import "./MediaMBMedia.css";
import { MediaContext } from "../../contexts/MediaContext";
import placeHolder from "../../images/place_holder2.jpg";
import HeaderGeneric from "../header/HeaderGeneric";
import { useFirebase } from "../../hooks/useFirebase";
import { irepsConstants } from "../../utils/utils";

const MediaMBMedia = () => {
	const { mediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);
	const { getStrFromFbTimestamp } = useFirebase();

	let src, alt, mediaType, createdBy, createdAtDatetime;
	if (mediaData?.data?.length) {
		src = mediaData?.data[mediaData?.displayPosition]?.url;
		alt = mediaData?.data?.metadata?.mediaCatergory;
		const currentData = mediaData?.data[mediaData?.displayPosition];

		mediaType = currentData?.metadata.mediaType;
		createdBy = currentData?.metadata?.createdByUser;
		createdAtDatetime = currentData?.metadata?.createdAtDatetime;
	} else {
		src = placeHolder;
		alt = "no image";
	}

	return (
		<div className="media-mb-media">
			<div className="media">
				{(mediaType === "image/jpeg" || mediaType === "image/png") && (
					<img
						className="image displayMedia"
						src={src}
						alt={alt}
						width={"100%"}
						height={"100%"}
					/>
				)}
				{mediaType === "video/webm" && (
					<>
						<HeaderGeneric
							hl1={createdBy}
							hr3={getStrFromFbTimestamp(
								createdAtDatetime,
								irepsConstants.IC_DATE_FORMAT1
							)}
						/>
						<video className="video displayMedia" controls src={src}></video>
					</>
				)}
				{mediaType === "audio/webm" && (
					<>
						<HeaderGeneric
							hl1={createdBy}
							hr3={getStrFromFbTimestamp(
								createdAtDatetime,
								irepsConstants.IC_DATE_FORMAT1
							)}
						/>
						<audio className="audio displayMedia" controls src={src}></audio>
					</>
				)}
			</div>
		</div>
	);
};

export default MediaMBMedia;
