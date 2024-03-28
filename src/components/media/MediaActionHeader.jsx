import { useContext } from "react";
import HeaderGeneric from "../header/HeaderGeneric";
import "./MediaActionHeader.css";
import { MediaContext } from "../../contexts/MediaContext";

const MediaActionHeader = props => {
	// console.log(`props`, props);
	const { hl1 } = props;
	const { mediaData, setMediaData } = useContext(MediaContext);
  const handleClick = e => {
    setMediaData({
					...mediaData,
					activeMediaAction: null
				});
  };

	return (
		<div className="media-action-header">
      <HeaderGeneric hl1={hl1}>
        {/* mah - media action header */}
				<button className="mah-btn" onClick={handleClick}>X</button>
			</HeaderGeneric>
		</div>
	);
};

export default MediaActionHeader;
