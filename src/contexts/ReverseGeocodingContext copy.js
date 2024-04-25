import React, { createContext, useState } from "react";

// Create context:
export const ReverseGeocodingContext = createContext();

const intiValue = {
	data: {},
	isOpened: false,
};

const ReverseGeocodingContextProvider = props => {
	// console.log(`props`, props);
	const [rgcData, setRgcData] = useState(intiValue);
	// console.log(`rgcData`, rgcData);
	return (
		<ReverseGeocodingContext.Provider value={{ rgcData, setRgcData }}>
			{props.children}
		</ReverseGeocodingContext.Provider>
	);
};

export default ReverseGeocodingContextProvider;
