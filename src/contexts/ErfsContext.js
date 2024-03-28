import React, { createContext, useState } from "react";
// Create context:
export const ErfsContext = createContext();

const initSettings = {
	filterBtn: false,
	activeTab: 'table'
};

export const ErfsContextProvider = props => {
	const [ecs, setEcs] = useState(initSettings); // ecs - erfContextState
	// console.log(`ecs`, setEcs);
	return (
		<ErfsContext.Provider value={{ ecs, setEcs }}>
			{props.children}
		</ErfsContext.Provider>
	);
};
