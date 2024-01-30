import React, { useEffect, useReducer } from "react";
import { createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig/fbConfig";

const authReducer = (state, action) => {
	switch (action.type) {
		case "SIGNIN":
			return { ...state, user: action.payload };
		case "SIGNOUT":
			return { ...state, user: null };
		case "AUTH_IS_READY":
			return {
				...state,
				user: action.payload,
				isAuthReady: true,
			};
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

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, user => {
			dispatch({
				type: "AUTH_IS_READY",
				payload: user,
			});
			unsub();
		});
	}, []);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
