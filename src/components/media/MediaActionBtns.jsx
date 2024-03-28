import { useContext } from "react";
import "./MediaActionBtns.css";
import { MediaContext } from "../../contexts/MediaContext";
import { FaCamera } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { IoIosVideocam } from "react-icons/io";
import { IoMdPhotos } from "react-icons/io";
import { IconContext } from "react-icons";

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
			<button
				id={"camera"}
				onClick={handleClick}
				className="mab mab-photos camera"
				title="take a photo with camera"
			>
				<IconContext.Provider value={{ color: "blue", fontSize: "3rem" }}>
					<FaCamera  />
				</IconContext.Provider>
			</button>
			<button
				id={"voice"}
				onClick={handleClick}
				className="mab mab-voice-clips"
				title="make a voice clip"
			>
				<IconContext.Provider value={{ color: "blue", fontSize: "3rem" }}>
					<FaMicrophone />
				</IconContext.Provider>
			</button>
			<button
				id={"video"}
				onClick={handleClick}
				className="mab mab-video-clips"
				title="make a video clip"
			>
				<IconContext.Provider value={{ color: "blue", fontSize: "3rem" }}>
					<IoIosVideocam />
				</IconContext.Provider>
			</button>
			<button
				id={"gallery"}
				onClick={handleClick}
				className="mab mab-gallery"
				title="take a photo from gallery"
			>
				<IconContext.Provider value={{ color: "blue", fontSize: "3rem" }}>
					<IoMdPhotos />
				</IconContext.Provider>
			</button>
		</div>
	);
};

export default MediaActionBtns;
