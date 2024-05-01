import "./MapErfLocationAdr.css";

const MapErfLocationAdr = props => {
	const { adr, gps } = props;
	return (
		<div className="map-erf-location-adr">
			<p className="adr">{adr}</p>
			<p className="gps">{gps}</p>
		</div>
	);
};

export default MapErfLocationAdr;
