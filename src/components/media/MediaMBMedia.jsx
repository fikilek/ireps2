import { useContext } from "react";
import "./MediaMBMedia.css";
import { MediaContext } from "../../contexts/MediaContext";
import placeHolder from "../../images/place_holder2.jpg";

const MediaMBMedia = () => {
	const { mediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);

	let src, alt, mediaType;
	if (mediaData?.data?.length) {
		src = mediaData?.data[mediaData?.displayPosition]?.url;
		alt = mediaData?.data?.metadata?.mediaCatergory;
		mediaType =  mediaData?.data[mediaData?.displayPosition]?.metadata.mediaType;
	} else {
		src = placeHolder;
		alt = "no image";
	}

	return (
		<div className="media-mb-media">
			<div className="media">
				{(mediaType === "image/jpeg" || mediaType === "image/png")  && (
					<img
						className="image displayMedia"
						src={src}
						alt={alt}
						width={"100%"}
						height={"100%"}
					/>
				)}
				{mediaType === "video/webm" && (
					<video className="video displayMedia" controls src={src}></video>
				)}
				{mediaType === "audio/webm" && (
					<audio className="audio displayMedia" controls src={src}></audio>
				)}
			</div>
		</div>
	);
};

export default MediaMBMedia;
