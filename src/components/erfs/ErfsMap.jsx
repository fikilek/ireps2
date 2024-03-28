import MapBoundaries from "../maps/MapBoundaries";
import MapErfsMarkers from "../maps/MapErfsMarkers";
import MapIrepsMap from "../maps/MapIrepsMap";
import "./ErfsMap.css";

const ErfsMap = () => {
	return (
		<div className="erfs-map">
			<MapIrepsMap>
				<MapBoundaries />
				<MapErfsMarkers />
			</MapIrepsMap>
		</div>
	);
};

export default ErfsMap;
