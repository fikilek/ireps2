import {
	APIProvider,
	ControlPosition,
	Map,
	MapControl,
	useMap,
} from "@vis.gl/react-google-maps";
import "./MapIrepsMap.css";
import MapCenterMap from "./MapCenterMap";
import { useState } from "react";
import MapUserLocationOnMap from "./MapUserLocationOnMap";
import MapZoomControl from "./MapZoomControl";

const MapIrepsMap = (props) => {
	// console.log(`props`, props);

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
		<div className="map-ireps-map">
			<APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
				<Map
					defaultZoom={15}
					defaultCenter={defaultCenter}
					gestureHandling={"greedy"}
					disableDefaultUI={false}
					mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
					onCenterChanged={onCenterChanged}
					onBoundsChanged={onBoundsChanged}
				>
					<MapControl position={ControlPosition.RIGHT_BOTTOM}>
						<MapCenterMap mapCentered={mapCentered} setMapCentered={setMapCentered} />
					</MapControl>
					<MapUserLocationOnMap />
					{props.children}
				</Map>
			</APIProvider>
		</div>
	);
};

export default MapIrepsMap;
