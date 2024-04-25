import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import IwShowOnMap from "./IwShowOnMap";
import "./ShowOnMap.css";
import { useDocument } from "../../hooks/useDocument";

const ShowOnMap = props => {
	console.log(`props`, props);

	const { erfId } = props.data.data.erf;
	console.log(`erfId`, erfId);

	const [gpsPoint, setGpsPoint] = useState({});
	console.log(`gpsPoint`, gpsPoint);

	const { error, document } = useDocument("erfs", erfId);
	console.log(`document`, document);
	console.log(`error`, error);

	useEffect(() => {
		console.log(`document changed`, document);
		setGpsPoint({
			point: {
				lat: document?.address?.gps?.latitude,
				lng: document?.address?.gps?.longitude,
			},
			label: document?.erfNo,
		});
	}, [document]);

	return (
		<div className="show-on-map">
			{gpsPoint?.point?.lat && (
				<IwShowOnMap
					lat={gpsPoint?.point?.lat}
					lng={gpsPoint?.point?.lng}
					label={gpsPoint?.label}
				/>
			)}
		</div>
	);
};

export default ShowOnMap;
