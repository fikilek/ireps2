import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useErfs } from "../../hooks/useErfs";
import "./MapErfsMarkers.css";
import { useContext } from "react";
import { ErfsContext } from "../../contexts/ErfsContext";

const MapErfsMarkers = () => {
	const { erfsContext } = useContext(ErfsContext);
	console.log(`erfsContext`, erfsContext);
	const {erfs} = erfsContext
	return (
		<div className="map-erfs-markers">
			{erfs &&
				erfs.map(erf => {
					const point = {
						lat: erf.address.gps.latitude,
						lng: erf.address.gps.longitude,
					};
					return (
						<AdvancedMarker position={point} key={erf.id} >
							<Pin background={"#22ccff"} borderColor={"#1e89a1"} scale={1}>
								{/* children are rendered as 'glyph' of pin */}
                <span className="erf">{ erf.erfNo}</span>
							</Pin>
						</AdvancedMarker>
					);
				})}
		</div>
	);
};

export default MapErfsMarkers;
