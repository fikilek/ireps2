import React, { createContext, useState } from "react";
// Create context:
export const TrnsContext = createContext();

const initSettings = {
	filterBtn: false,
	activeTab: "table",
	activeArea: "",
	trns: [],
};

export const TrnsContextProvider = props => {
	const [trnsContext, setTrnsContext] = useState(initSettings);
	// console.log(`trnsContext`, trnsContext);
	return (
		<TrnsContext.Provider value={{ trnsContext, setTrnsContext }}>
			{props.children}
		</TrnsContext.Provider>
	);
};
