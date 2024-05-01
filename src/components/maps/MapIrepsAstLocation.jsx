import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import "./MapIrepsAstLocation.css";
import MapIrepsCenteredMap from "./MapIrepsCenteredMap";
import MapZoomSetter from "./MapZoomSetter";
import { setKey, setLanguage, geocode, RequestType } from "react-geocode";
import { useContext, useEffect, useState } from "react";
import { ReverseGeocodingContext } from "../../contexts/ReverseGeocodingContext";
import MapAstLocationAdr from "./MapAstLocationAdr";

const initAdr = "Move The Ast Marker To Meter Location.";

const MapIrepsAstLocation = props => {
	const { center, erfNo } = props;
	// console.log(`center`, center)

  const [adr, setAdr] = useState(initAdr);
  console.log(`adr`, adr)
	const [gps, setGps] = useState('');
  console.log(`gps`, gps)

	useEffect(() => {
		setAdr(initAdr);
	}, []);

	const { rgcData, setRgcData } = useContext(ReverseGeocodingContext);
	// console.log(`rgcData`, rgcData);

	const onDragEnd = e => {

		rgcData?.data?.form?.setFieldValue(
			"location.gps.lat",
			e.latLng.lat().toFixed(6)
		);
		rgcData?.data?.form?.setFieldValue(
			"location.gps.lng",
			e.latLng.lng().toFixed(6)
		);

		if (geocode) {
			setKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

			// set response language. Defaults to english.
			setLanguage("en");

			const lat = e.latLng.lat().toFixed(6);
			// console.log(`lat`, typeof lat.toString())
			const lng = e.latLng.lng().toFixed(6);
			// console.log(`lng`, typeof lng.toString())

			const location = `${lat}, ${lng}`;
			// console.log(`location`,location)

			const gpsLocation = `Lat:${lat} | Lng:${lng}`;
			// console.log(`location`,location)

			geocode(RequestType.LATLNG, location, {
				location_type: "ROOFTOP", // Override location type filter for this request.
				enable_address_descriptor: true, // Include address descriptor in response.
			})
				.then(response => {
					// console.log(`response`, response);
					const address = response.results[0].formatted_address;
					// console.log(address);
					// console.log(`rgcData`, rgcData);
					setAdr(address);
					setGps(gpsLocation);
					rgcData.data.form.setFieldValue("location.address", address);
					// console.log(`rgcData`, rgcData);
				})
				.catch(error => {
					console.error(`Error reverse geocoding: `, error);
					setAdr(`Google Adr Not Avaiable.`);
					setGps(gpsLocation);
					rgcData.data.form.setFieldValue(
						"location.address",
						"Google Adr Not Avaiable"
					);
				});
		}
	};

	return (
		<div className="map-ireps-ast-location">
			<MapIrepsCenteredMap center={center}>
				<AdvancedMarker position={center} draggable={true} onDragEnd={onDragEnd}>
					<Pin background={"#22ccff"} borderColor={"#1e89a1"} scale={3}>
						<span className="erf">{erfNo}</span>
					</Pin>
				</AdvancedMarker>
				<MapZoomSetter center={center} />
			</MapIrepsCenteredMap>
			<MapAstLocationAdr adr={adr} gps={gps} />
		</div>
	);
};

export default MapIrepsAstLocation;
