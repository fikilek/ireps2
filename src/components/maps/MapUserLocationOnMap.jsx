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

				<div
            style={{
              width: 16,
              height: 16,
              position: 'absolute',
              top: 0,
              left: 0,
              background: '#1dbe80',
              border: '2px solid #0e6443',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }}></div>
				
				{/* <span background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} > */}
					{/* <p className="custom-marker" >O</p> */}
			</AdvancedMarker>
		</div>
	);
};

export default MapUserLocationOnMap;
