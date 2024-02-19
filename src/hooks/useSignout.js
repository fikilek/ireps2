import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebaseConfig/fbConfig";
import useAuthContext from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignout = () => {
	const [error, setError] = useState(null);

	const { dispatch } = useAuthContext();

	const navigate = useNavigate();

	const signout = async () => {
		try {
			await signOut(auth);

			dispatch({ type: "SIGNOUT" });

			navigate("/");
		} catch (err) {
			setError(err.message);

			console.log(`signout err`, err.message);
		}
	};

	return { signout, error };
};
