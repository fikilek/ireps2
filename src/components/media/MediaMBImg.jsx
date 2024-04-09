import { useContext } from "react";
import "./MediaMBImg.css";
import { MediaContext } from "../../contexts/MediaContext";
import placeHolder from "../../images/place_holder2.jpg";

const MediaMBImg = () => {
	const { mediaData, setMediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);

	let src, alt;
	if (mediaData?.data?.length) {
		src = mediaData?.data[mediaData?.displayPosition]?.url;
		alt = mediaData?.data?.metadata?.mediaCatergory;
	} else {
		src = placeHolder;
		alt = "no image";
	}

	return (
		<div className="media-mb-img">
			<div className="image">
				<img src={src} alt={alt} width={"100%"} height={"100%"} />
			</div>
		</div>
	);
};

export default MediaMBImg;
