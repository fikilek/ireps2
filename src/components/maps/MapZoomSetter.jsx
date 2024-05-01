import { useMap } from "@vis.gl/react-google-maps";
import React, { useEffect } from "react";

const MapZoomSetter = (props) => {
  const {center} = props
	const map = useMap();

	useEffect(() => {
		if (!map) return;
    map.setZoom(19);
    map.panTo(center)
	}, [map, center]);
	return null;
};

export default MapZoomSetter;