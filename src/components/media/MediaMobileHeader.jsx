import { useContext } from "react";
import HeaderLabel from "../header/HeaderLabel";
import MediaActionBtns from "./MediaActionBtns";
import "./MediaMobileHeader.css";
import { MediaContext } from "../../contexts/MediaContext";
import FormCloseBtn from "../forms/formBtns/FormCloseBtn";

const MediaMobileHeader = () => {
	const { mediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);
	const { erfNo } = mediaData?.erfData;

	return (
		<div className="media-mobile-header">
			<div className="hl">
				<HeaderLabel labelName={"Erf"} label={erfNo} />
			</div>
			<div className="hr">
				<MediaActionBtns />
				<FormCloseBtn />
			</div>
		</div>
	);
};

export default MediaMobileHeader;
