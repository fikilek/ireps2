import MediaFilters from "./MediaFilters";
import MediaThumbnails from './MediaThumbnails'
import "./MediaFooter.css";

const MediaFooter = (props) => {
	const {data} = props
	return (
		<div className="media-footer">
			<MediaFilters />
			<MediaThumbnails data={data} />
		</div>
	);
};

export default MediaFooter;
