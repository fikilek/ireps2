import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import "./MapIrepsErfLocation.css";
import MapIrepsCenteredMap from "./MapIrepsCenteredMap";
import MapZoomSetter from "./MapZoomSetter";
import { setKey, setLanguage, geocode, RequestType } from "react-geocode";
import { useContext, useEffect, useState } from "react";
import { ReverseGeocodingContext } from "../../contexts/ReverseGeocodingContext";
import MapErfLocationAdr from "./MapErfLocationAdr";

const initAdr = "Move The Ast Marker To Meter Location.";

const MapIrepsErfLocation = props => {
	console.log(`props`, props)
	const { center, erfNo } = props;
	// console.log(`center`, center)

	const [adr, setAdr] = useState(initAdr);
	console.log(`adr`, adr);
	const [gps, setGps] = useState("");
	console.log(`gps`, gps);

	useEffect(() => {
		setAdr(initAdr);
	}, []);

	const { rgcData, setRgcData } = useContext(ReverseGeocodingContext);
	// console.log(`rgcData`, rgcData);

	// const onDragEnd = e => {

	// rgcData?.data?.form?.setFieldValue(
	// 	"location.gps.lat",
	// 	e.latLng.lat().toFixed(6)
	// );
	// rgcData?.data?.form?.setFieldValue(
	// 	"location.gps.lng",
	// 	e.latLng.lng().toFixed(6)
	// );

	if (geocode) {
		setKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

		// set response language. Defaults to english.
		setLanguage("en");

		const lat = center.lat.toFixed(6);
		// console.log(`lat`, typeof lat.toString())
		const lng = center.lng.toFixed(6);
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
				rgcData.data.form.setFieldValue("address.systemAdr", address);
				// console.log(`rgcData`, rgcData);
			})
			.catch(error => {
				console.error(`Error reverse geocoding: `, error);
				setAdr(`Google Adr Not Avaiable.`);
				setGps(gpsLocation);
				rgcData.data.form.setFieldValue(
					"address.systemAdr",
					"Google Adr Not Avaiable"
				);
			});
		// }
	}

	return (
		<div className="map-ireps-erf-location">
			<MapIrepsCenteredMap center={center}>
				<AdvancedMarker position={center} >
					<Pin background={"#ffcc11"} borderColor={"#ff89bb"} scale={2}>
						<span className="erf">{erfNo}</span>
					</Pin>
				</AdvancedMarker>
				<MapZoomSetter center={center} />
			</MapIrepsCenteredMap>
			<MapErfLocationAdr adr={adr} gps={gps} />
		</div>
	);
};

export default MapIrepsErfLocation;
