import React, { useContext, useEffect } from "react";
import "./Media.css";
import MediaBody from "./MediaBody";
import { MediaContext } from "../../contexts/MediaContext";
import MediaFooter from "./MediaFooter";
import MediaAction from "./MediaAction";
import useCollection from "../../hooks/useCollection";

const Media = props => {
	// console.log(`props`, props)
	const { data } = props;

	const { mediaData, setMediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData)

	const {
		data: mediaInfo,
		error,
		isPending,
		success,
	} = useCollection("media", ["metadata.erfId", "==", data.id]);
	// console.log(`mediaInfo`, mediaInfo);

	// Media data
	useEffect(() => {
		if (data) {
			setMediaData({
				...mediaData,
				data: mediaInfo,
			});
		}
	}, [mediaInfo]);

	// Erf data
	useEffect(() => {
		if (data) {
			setMediaData({
				...mediaData,
				erfData: data,
			});
		}
	}, [data]);

	return (
		<div className="media">
			<MediaBody data={data} />
			<MediaFooter data={data} />
			<MediaAction data={data} />
		</div>
	);
};

export default Media;
