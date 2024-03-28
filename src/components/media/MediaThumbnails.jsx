import { useContext } from "react";
import "./MediaThumbnails.css";
import { MediaContext } from "../../contexts/MediaContext";

const MediaThumbnails = props => {
	// console.log(`props`, props)
	// const { data: erfData } = props;
	// console.log(`erfData`, erfData);

	const { mediaData, setMediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);

	const handleClick = e => {
		setMediaData({
			...mediaData,
			displayPosition: e.target.id
		})
	}

	return (
		<div className="media-thumbnails">
			{mediaData.data &&
				mediaData.data.map((media, index) => {
					return <img onClick={handleClick} id={index} key={media.id} width={'120rem'} height={'120rem'} src={media.url} alt={media.metadata.mediaCategory} />;
				})}
		</div>
	);
};

export default MediaThumbnails;
