import React, { createContext, useEffect, useState } from "react";
// import useCollection from "../hooks/useCollection";

// Create context:
export const ClaimsContext = createContext();

const ClaimsContextProvider = props => {
	// const { data } = useCollection("erfs");
	// console.log(`data`, data)

	// console.log(`props`, props);
	const [customClaims, setCustomClaims] = useState(null);
	// console.log(`customClaims`, customClaims);

	return (
		<ClaimsContext.Provider value={{ customClaims, setCustomClaims }}>
			{props.children}
		</ClaimsContext.Provider>
	);
};

export default ClaimsContextProvider;
