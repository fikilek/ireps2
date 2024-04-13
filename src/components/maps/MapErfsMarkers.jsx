import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useErfs } from "../../hooks/useErfs";
import "./MapErfsMarkers.css";

const MapErfsMarkers = () => {
	const { erfs } = useErfs();
	// console.log(`erfs`, erfs);
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
