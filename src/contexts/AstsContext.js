import React, { createContext, useState } from "react";
// Create context:
export const AstsContext = createContext();

const initSettings = {
	filterBtn: false,
	activeTab: "table",
	activeArea: "",
	asts: [],
};

export const AstsContextProvider = props => {
	const [astsContext, setAstsContext] = useState(initSettings);
	// console.log(`astsContext`, astsContext);
	return (
		<AstsContext.Provider value={{ astsContext, setAstsContext }}>
			{props.children}
		</AstsContext.Provider>
	);
};
