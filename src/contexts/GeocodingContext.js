import React, { createContext, useState } from "react";
import { useEffect } from "react";

// Create context:
export const GeocodingContext = createContext();

const intiValue = {
	data: {},
	isOpened: false,
};

const GeocodingContextProvider = props => {
	// console.log(`props`, props);
	const [gcData, setGcData] = useState(intiValue);
	// console.log(`gcData`, gcData);

	useEffect(() => {
		return () => {
			setGcData(intiValue);
		};
	}, []);

	return (
		<GeocodingContext.Provider value={{ gcData, setGcData }}>
			{props.children}
		</GeocodingContext.Provider>
	);
};

export default GeocodingContextProvider;
