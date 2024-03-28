import { useContext } from "react";
import MapMarkerOnMap from "./MapMarkerOnMap";
import "./MapMediaCreationLocation.css";
import { MediaContext } from "../../contexts/MediaContext";
import { irepsDictionary } from "../../utils/utils";

const MapMediaCreationLocation = () => {
	const { mediaData } = useContext(MediaContext);
	// console.log(`mediaData`, mediaData);

	const metadata = mediaData?.data[mediaData?.displayPosition]?.metadata;
	// console.log(`metadata`, metadata);

	const gpsPoint = {
		lat: metadata?.lat,
		lng: metadata?.lng,
	};
	return (
    <div className="map-media-creation-location">
      {
        metadata && <MapMarkerOnMap gpsPoint={gpsPoint} label={metadata.erfNo} />
      }
		</div>
	);
};

export default MapMediaCreationLocation;
