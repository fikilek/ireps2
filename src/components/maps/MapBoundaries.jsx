import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useContext, useEffect, useMemo, useState } from "react";
import useIrepsMap from "../../hooks/useIrepsMap";
import { AreaTreeContext } from "../../contexts/AreaTreeContext";

const MapBoundaries = props => {
	// console.log(`props`, props);
	const { tree } = props;

	// get map object
	const map = useMap();
	// console.log(`map`, map);

	const { selected, setSetSelected } = useContext(AreaTreeContext);
	// console.log(`selected`, selected);

	const selectedId = selected?.treeState?.tabbableId;
	// console.log(`selectedId`, selectedId);

	const isSelected = useMemo(
		() => selected?.treeState?.selectedIds?.values().next().value,
		[selected?.treeState?.selectedIds]
	);

	// console.log(`isSelected`, isSelected);
	// const selectedIdsSize = selected?.treeState?.tabbableIds?.values().next().value;
	// console.log(`selectedIdsSize`, selectedIdsSize);

	const name = useMemo(() => tree[selectedId]?.name, [tree, selectedId]);
	// console.log(`name`, name);

	const { showBoundaries } = useIrepsMap();

	useEffect(() => {
		map?.data?.forEach(function (feature) {
			// console.log(`feature`, feature);
			map?.data.remove(feature);
		});
		if (!map) return;
		showBoundaries(name, isSelected, map);
		// do something with the map instance
		return () => {
			// console.log(`cleaning`);
			// setSetSelected(null);
			map?.data?.forEach(function (feature) {
				// console.log(`feature`, feature);
				map?.data.remove(feature);
			});
		};
	}, [name, isSelected]);

	return <div className="map-boundaries">MapBoundaries</div>;
};

export default MapBoundaries;
