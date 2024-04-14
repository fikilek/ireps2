import "./MediaMobileFilters.css";
import { irepsIcons } from "../../utils/utils";
import MediaMobileFilter from "./MediaMobileFilter";
import { useContext } from "react";
import { MediaContext } from "../../contexts/MediaContext";

const MediaMobileFilters = props => {
	const { mediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);

	// create and array of mediaTypes from mediaData.data.mediaType
	const mediaTypes = mediaData.data.map(mt => mt.metadata.mediaType);
	// console.log(`mediaTypes`, mediaTypes);

	// filter only those that start with images
	const images = mediaTypes.filter(media => media.includes("image"));
	// console.log(`images`, images);

	// filter only those that start with videos
	const videos = mediaTypes.filter(media => media.includes("video"));
	// console.log(`videos`, videos);

	// filter only those that start with videos
	const audios = mediaTypes.filter(media => media.includes("audio"));
	// console.log(`audios`, audios);

	const totalMedia = mediaData.data.length;

	return (
		<div className="media-mobile-filters">
			<MediaMobileFilter
				mmfIcon={irepsIcons.ICON_TOTAL}
				label={totalMedia}
				color={""}
				name={"Total"}
			/>
			<MediaMobileFilter
				mmfIcon={irepsIcons.ICON_IMAGE1}
				label={images.length}
				color={""}
				name={"Images"}
			/>
			<MediaMobileFilter
				mmfIcon={irepsIcons.ICON_VOICE_CLIP}
				label={audios.length}
				color={""}
				name={"Voice Clips"}
			/>
			<MediaMobileFilter
				mmfIcon={irepsIcons.ICON_VIDEO_CLIP}
				label={videos.length}
				color={""}
				name={'Video Clips'}
			/>
		</div>
	);
};

export default MediaMobileFilters;
