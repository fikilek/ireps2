import "./MapAstLocationAdr.css";

const MapAstLocationAdr = props => {
	const { adr, gps } = props;
	return (
		<div className="map-ast-location-adr">
			<p className="adr">{adr}</p>
			<p className="gps">{gps}</p>
		</div>
	);
};

export default MapAstLocationAdr;
