import React, { useEffect, useState, useContext, useRef } from "react";
import "./MapReverseGeocodingApp.css";
import { ReverseGeocodingContext } from "../../contexts/ReverseGeocodingContext";
import HeaderGeneric4 from "../header/HeaderGeneric4";
import MapIrepsAstLocation from "./MapIrepsAstLocation";
import MapIrepsErfLocation from "./MapIrepsErfLocation";

const MapReverseGeocodingApp = props => {
	const { geocoding } = props;
	// map center
	const [center, setCenter] = useState({});
	// console.log(`center`, center);

	// retrieve erf no
	const [erfNumber, setErfNumber] = useState({});
	// console.log(`erfNo`, erfNo);

	const { rgcData, setRgcData } = useContext(ReverseGeocodingContext);
	// console.log(`rgcData`, rgcData);

	// geocode ast

	// retrive ast address from rgcData (ast location adr)
	const astAddress = rgcData?.data?.form?.values?.location?.address;
	// console.log(`gps`, gps);

	// retrive erf gps location from rgcData (gps location of the ast)
	const gps = rgcData?.data?.form?.values?.erf?.address?.gps;
	// console.log(`gps`, gps);

	// retrive erf gps location from rgcData (erf no that ast belongs to)
	const erfNo = rgcData?.data?.form?.values?.erf?.erfNo;
	// console.log(`gps`, gps);

	// geocde erf

	// retrive ast address from rgcData (ast location adr)
	const erfGps = rgcData?.data?.form?.values?.address?.gps;
	console.log(`erfGps`, erfGps);

	// retrive ast address from rgcData (ast location adr)
	const erfNum = rgcData?.data?.form?.values?.erfNo;
	console.log(`erfNum`, erfNum);

	useEffect(() => {
		if (gps) {
			setCenter({
				lat: gps.latitude,
				lng: gps.longitude,
			});
		}
		if (erfNo) {
			setErfNumber(erfNo);
		}
	}, [gps, erfNo]);

	const { isOpened } = rgcData;

	const openMapReverseGeocodingApp = isOpened ? "show-gc-app" : "hide-gc-app";

	const closeMapReverseGeocodingApp = e => {
		e.preventDefault();
		setRgcData({
			...rgcData,
			isOpened: false,
		});
	};

	return (
		<div className={`map-reverse-geocoding-app ${openMapReverseGeocodingApp}`}>
			{/* ErfNo, google adr, close <button type="reset"></button> */}
			<HeaderGeneric4
				hl1={astAddress || "Google Adr (When Available)"}
				hr1={
					<span>
						Erf No: <span className="text-emphasis2">{erfNo || erfNum}</span>
					</span>
				}
			>
				<button onClick={closeMapReverseGeocodingApp}>X</button>
			</HeaderGeneric4>
			{geocoding === "ast" && gps && (
				<MapIrepsAstLocation center={center} erfNo={erfNumber} />
			)}
			{geocoding === "erf" && erfGps && (
				<MapIrepsErfLocation
					center={{
						lat: erfGps.latitude,
						lng: erfGps.longitude,
					}}
					erfNo={erfNum}
				/>
			)}
		</div>
	);
};

export default MapReverseGeocodingApp;
