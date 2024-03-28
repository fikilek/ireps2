import { useContext, useState } from "react";
import MadiaMainDisplayHeader from "./MadiaMainDisplayHeader";
import "./MediaMainDisplay.css";
import { MediaContext } from "../../contexts/MediaContext";
import { format } from "date-fns";
import { constants } from "../../utils/utils";

const MediaMainDisplay = () => {
	const { mediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);

	const src = mediaData?.data[mediaData?.displayPosition]?.url;
	const alt = mediaData?.data?.metadata?.mediaCatergory;

	const createdByUser =
		mediaData?.data[mediaData?.displayPosition]?.metadata?.createdByUser;
	const timestamp =
		mediaData?.data[mediaData?.displayPosition]?.metadata?.createdAtDatetime;
	// console.log(`timestamp`, timestamp);
	let createdAtDatetime = "";
	if (timestamp) {
		createdAtDatetime = format(timestamp?.toDate(), constants.dateFormat2);
		// console.log(`createdAtDatetime`, createdAtDatetime);
	}
	return (
		<div className="media-main-display">
			<MadiaMainDisplayHeader hl1={createdByUser} hr3={createdAtDatetime} />

			<div className="main-display-container">
				{mediaData?.data?.length ? (
					<div className="image">
						<img src={src} alt={alt} width={"100%"} height={"70%"} />
					</div>
				) : (
					<p>No Image</p>
				)}
			</div>
		</div>
	);
};
export default MediaMainDisplay;
