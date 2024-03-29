import React, { useEffect } from "react";
import "./MapCenterMap.css";
import { MdCenterFocusStrong } from "react-icons/md";
import { IconContext } from "react-icons";
import { useMap } from "@vis.gl/react-google-maps";

const MapCenterMap = props => {
	const { userLocation, mapCentered, setMapCentered } = props;

	const map = useMap();
	// map.onChange();
	useEffect(() => {

		// console.log(`map: ${mapCentered ? "Centered" : "NOT Centered"} `);
		// console.log(`map`, map);
		// console.log(`userLocation`, userLocation);

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
