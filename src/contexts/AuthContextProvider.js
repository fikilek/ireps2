import { useEffect, useReducer } from "react";
import { createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig/fbConfig";

const authReducer = (state, action) => {
	switch (action.type) {
		case "SIGNIN":
			// console.log(`SIGNIN action.payload`, action.payload);
			return { ...state, user: action.payload };
		case "SIGNOUT":
			return {
				...state,
				user: null,
			};
		case "AUTH_IS_READY":
			// console.log(`AUTH_IS_READY action.payload`, action.payload);
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
	// console.log(`state`, state);

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (auth.currentUser) {
				auth.currentUser?.getIdTokenResult(true).then(userIdToken => {
					dispatch({
						type: "AUTH_IS_READY",
						payload: {
							...auth.currentUser,
							claims: userIdToken.claims.roles,
						},
					});
				});
			} else {
				dispatch({
					type: "AUTH_IS_READY",
					payload: null,
				});
			}
		});
	}, []);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
