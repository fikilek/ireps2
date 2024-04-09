import React, { useEffect } from "react";
import "./MapCenterMap.css";
import { MdCenterFocusStrong } from "react-icons/md";
import { IconContext } from "react-icons";
import { useMap } from "@vis.gl/react-google-maps";
import useGeoLocation from "../../hooks/useGeolocation";

const MapCenterMap = props => {
	const { mapCentered, setMapCentered } = props;

	const { userLocation } = useGeoLocation();
	// console.log(`userLocation`, userLocation);

	const map = useMap();
	useEffect(() => {
		if(!userLocation.loaded) return 
		if (mapCentered) {
			map.panTo(userLocation?.coordinates);
		}
	}, [mapCentered, userLocation, map]);

	const handleClick = e => {
		setMapCentered(!mapCentered);
	};
	return (
		<div className={`come-to-me `} onClick={handleClick}>
			<IconContext.Provider
				value={{
					size: "4rem",
					className: `${mapCentered ? "centered" : "not-centered"}`,
				}}
			>
				<MdCenterFocusStrong />
			</IconContext.Provider>
		</div>
	);
};

export default MapCenterMap;
