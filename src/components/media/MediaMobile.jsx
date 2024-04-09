import React, { useContext, useEffect } from "react";
import "./MediaMobile.css";
import MediaBody from "./MediaBody";
import { MediaContext } from "../../contexts/MediaContext";
import MediaFooter from "./MediaFooter";
import MediaAction from "./MediaAction";
import useCollection from "../../hooks/useCollection";
import MediaMobileHeader from "./MediaMobileHeader";
import MediaMobileBody from "./MediaMobileBody";
import MediaMobileFooter from "./MediaMobileFooter";
import MediaMobileAction from "./MediaMobileAction";

const MediaMobile = props => {
	// console.log(`props`, props)
	const { data } = props;

	const { mediaData, setMediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData)

	const {
		data: erfMediaInfo,
		error,
		isPending,
		success,
	} = useCollection("media", ["metadata.erfId", "==", data.id]);
	// console.log(`erfMediaInfo`, erfMediaInfo);

	// MediaMobile data
	useEffect(() => {
		if (data) {
			setMediaData({
				...mediaData,
				data: erfMediaInfo,
			});
		}
	}, [erfMediaInfo]);

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
		<div className="media-mobile"> 
			<MediaMobileHeader />
			<MediaMobileBody  />
			<MediaMobileFooter />
			<MediaAction data={data}  />
		</div>
	);
};

export default MediaMobile;
