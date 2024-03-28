import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import "./MapUserLocationOnMap.css";
import useGeoLocation from "../../hooks/useGeolocation";

const MapUserLocationOnMap = () => {
	const { userLocation } = useGeoLocation();
	// console.log(`userLocation`, userLocation);

	const defaultCenter = {
		lat: -26.541960658447646,
		lng: 28.338629116440828,
  };
  
	return (
		<div className="map-user-location-on-map">
			<AdvancedMarker
				position={userLocation?.loaded ? userLocation?.coordinates : defaultCenter}
			>
				<Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
			</AdvancedMarker>
		</div>
	);
};

export default MapUserLocationOnMap;
