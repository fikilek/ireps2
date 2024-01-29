import React, { useReducer } from "react";
import { createContext } from "react";

const authReducer = (state, action) => {
	switch (action.type) {
		case "SIGNIN":
			return { ...state, user: action.payload };
		case "SIGNOUT":
			return { ...state, user: null };
		default:
			return state;
	}
};

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		isAuthReady: false,
	});
	console.log(`state`, state);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
