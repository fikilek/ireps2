import { TbSum } from "react-icons/tb";
import "./MediaMobileFilters.css";
import { irepsIcons } from "../../utils/utils";
import MediaMobileFilter from "./MediaMobileFilter";

const MediaMobileFilters = props => {
	return (
		<div className="media-mobile-filters">
			<MediaMobileFilter
				mmfIcon={irepsIcons.ICON_TOTAL}
				label={"4"}
				color={""}
				name={"total"}
			/>
			<MediaMobileFilter
				mmfIcon={irepsIcons.ICON_IMAGE1}
				label={"2"}
				color={""}
				name={"images"}
			/>
			<MediaMobileFilter
				mmfIcon={irepsIcons.ICON_VOICE_CLIP}
				label={"1"}
				color={""}
				name={"voiceClips"}
			/>
			<MediaMobileFilter
				mmfIcon={irepsIcons.ICON_VIDEO_CLIP}
				label={"0"}
				color={""}
				name={"videoClips"}
			/>
		</div>
	);
};

export default MediaMobileFilters;
