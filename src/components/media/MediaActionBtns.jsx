import { useContext } from "react";
import "./MediaActionBtns.css";
import { MediaContext } from "../../contexts/MediaContext";
import { FaCamera } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { IoIosVideocam } from "react-icons/io";
import { IoMdPhotos } from "react-icons/io";
import MediaActionBtn from "./MediaActionBtn";

const MediaActionBtns = () => {
	const { mediaData, setMediaData } = useContext(MediaContext);
	// console.log(mediaData, mediaData)

	const handleClick = e => {
		// console.log(`e.currentTarget.id`, e.currentTarget.id);
		setMediaData({
			...mediaData,
			activeMediaAction: e.currentTarget.id,
		});
	};

	return (
		<div className="media-action-btns">
			<MediaActionBtn
				id={"camera"}
				actionClassname={"mab-photos camera"}
				title={"take a photo with camera"}
				actionIcon={<FaCamera />}
				clickHanderFunction={handleClick}
				color={"blue"}
				active={mediaData.activeMediaAction === 'camera' ? 'active' : ""}
			/>
			<MediaActionBtn
				id={"voice"}
				actionClassname={"mab-voice voice"}
				title={"make a voice clipa"}
				actionIcon={<FaMicrophone />}
				clickHanderFunction={handleClick}
				color={"blue"}
				active={mediaData.activeMediaAction === 'voice' ? 'active' : ""}
			/>
			<MediaActionBtn
				id={"video"}
				actionClassname={"mab-video video"}
				title={"take a video shot"}
				actionIcon={<IoIosVideocam />}
				clickHanderFunction={handleClick}
				color={"blue"}
				active={mediaData.activeMediaAction === 'video' ? 'active' : ""}
			/>
			<MediaActionBtn
				id={"gallery"}
				actionClassname={"mab-gallery gallery"}
				title={"take images from the gallery"}
				actionIcon={<IoMdPhotos />}
				clickHanderFunction={handleClick}
				color={"blue"}
				active={mediaData.activeMediaAction === 'gallery' ? 'active' : ""}
			/>
		</div>
	);
};

export default MediaActionBtns;
