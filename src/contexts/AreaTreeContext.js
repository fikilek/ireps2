import React, { createContext, useState } from "react";
// Create context:
export const AreaTreeContext = createContext();

const initAreaSetings = {
	name: "",
};

// A "provider" is used to encapsulate only the
// components that needs the state in this context
export const AreaTreeContextProvider = props => {
	// console.log(`props`, props);
	const [selected, setSetSelected] = useState(initAreaSetings);
	// console.log(`selected`, selected);
	return (
		<AreaTreeContext.Provider value={{ selected, setSetSelected }}>
			{props.children}
		</AreaTreeContext.Provider>
	);
};
