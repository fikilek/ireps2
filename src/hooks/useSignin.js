import { useState } from "react";
import { auth } from "../firebaseConfig/fbConfig";
import useAuthContext from "./useAuthContext";
import {
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
} from "firebase/auth";

export const useSignin = () => {
	const { dispatch } = useAuthContext();
	const [error, setError] = useState(null);

	const signin = async userCredentials => {
		const { email, password } = userCredentials;
		try {
			const result = await signInWithEmailAndPassword(auth, email, password);

			if (!result) {
				console.log("User signin failed");
				throw new Error("User signin failed");
			}

			const { user } = result;

			const idToken = await auth.currentUser.getIdTokenResult(true);

			dispatch({
				type: "SIGNIN",
				payload: {
					...user,
					claims: idToken.claims.roles,
				},
			});
		} catch (err) {
			console.log(`Signin Error`, err.message);
			setError(err.message);
		}
	};

	const passwordReset = async userCredentials => {
		const { email } = userCredentials;

		try {
			await sendPasswordResetEmail(auth, email);
		} catch (err) {
			console.log(`Password Reset  Error: `, err.message);
			setError(err.message);
		}
	};

	return { signin, passwordReset, error };
};
