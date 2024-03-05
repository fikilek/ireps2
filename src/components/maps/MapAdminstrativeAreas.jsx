import {
	APIProvider,
	AdvancedMarker,
	Map,
	Pin,
} from "@vis.gl/react-google-maps";
import "./MapAdminstrativeAreas.css";
import useGeoLocation from "../../hooks/useGeolocation";
import MapCenterMap from "./MapCenterMap";
import { useContext, useState } from "react";
import MapBoundaries from "./MapBoundaries";
import { AreaTreeContext } from "../../contexts/AreaTreeContext";

const MapAdministrativeAreas = props => {
	// console.log(`props`, props);
	const { tree } = props;

	const { selected } = useContext(AreaTreeContext)
	// console.log(`selected`, selected)

	// get user location
	const { userLocation } = useGeoLocation();
	// console.log(`userLocation`, userLocation);

	const [mapCentered, setMapCentered] = useState(false);
	// console.log(`map: ${mapCentered ? "Centered" : "NOT Centered"} `);

	const defaultCenter = {
		lat: -26.541960658447646,
		lng: 28.338629116440828,
	};

	const onCenterChanged = e => {
		// console.log(`map position has changed`);
		setMapCentered(false);
	};

	const onBoundsChanged = e => {
		// console.log(`bondaries changed e: `, e)
		// const bounds = e.map.getBounds()
		// console.log(`bounds`, bounds)
	};

	return (
		<div className="map-administrative-areas">
			<APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
				<Map
					defaultZoom={15}
					defaultCenter={defaultCenter}
					gestureHandling={"greedy"}
					disableDefaultUI={true}
					mapId={"2a15550fef55a6ba"}
					onCenterChanged={onCenterChanged}
					onBoundsChanged={onBoundsChanged}
				>
					<AdvancedMarker
						position={
							userLocation?.loaded ? userLocation?.coordinates : defaultCenter
						}
					>
						<Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
					</AdvancedMarker>
					<MapBoundaries tree={tree} />
					<MapCenterMap
						userLocation={userLocation}
						mapCentered={mapCentered}
						setMapCentered={setMapCentered}
					/>
				</Map>
			</APIProvider>
		</div>
	);
};

export default MapAdministrativeAreas;
