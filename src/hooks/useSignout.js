import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebaseConfig/fbConfig";
import useAuthContext from "./useAuthContext";

export const useSignout = () => {
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const signout = async () => {
		try {
			setIsPending(true);
			setError(null);
			await signOut(auth);
			dispatch({ type: "SIGNOUT" });
			setIsPending(false);
			setError(null);
		} catch (err) {
			setIsPending(false);
			setError(err.message);
			// console.log(`signout err`, err.message);
		}
	};

	return { signout, error, isPending };
};
