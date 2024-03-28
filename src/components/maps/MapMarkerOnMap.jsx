import { AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import "./MapMarkerOnMap.css";
import { useEffect } from "react";

const MapMarkerOnMap = (props) => {
  const { gpsPoint, label } = props
  const map = useMap()
  useEffect(() => {
			if (!map) return;
			// console.log(`map`, map);
			map.panTo(gpsPoint);
			map.setZoom(18);
		}, [map, gpsPoint]);
  return (
			<div className="map-marker-on-map">
				<AdvancedMarker position={gpsPoint}>
					<Pin background={"#22ccff"} borderColor={"#1e89a1"} scale={1}>
						{/* children are rendered as 'glyph' of pin */}
						<span className="erf">{label}</span>
					</Pin>
				</AdvancedMarker>
			</div>
		);
}

export default MapMarkerOnMap