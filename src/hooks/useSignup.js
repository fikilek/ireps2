import {
	createUserWithEmailAndPassword,
	updateProfile,
	// sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebaseConfig/fbConfig";
import useAuthContext from "./useAuthContext";

export const useSignup = () => {
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();
	const [success, setSuccess] = useState(false);

	const signup = async userCredentials => {
		const { email, password, surname, name, phoneNumber, companyName, workbase } =
			userCredentials;
		try {
			setIsPending(true);
			setError(null);
			setSuccess(false);
			const result = await createUserWithEmailAndPassword(auth, email, password);
			if (!result) {
				setIsPending(false);
				throw new Error("User signup failed");
			}
			console.log(`result`, result.user);
			const { user } = result;

			// update dispalyName details at firebase auth user. Use first letter of surname and name as dispalyName
			await updateProfile(auth.currentUser, {
				displayName: `${name} ${surname}`,
			});

			// TODO:create user profile in firestore using UID as the unique identifier
			const docRef = doc(db, "users", user.uid);
			const datetime = Timestamp.now();
			await setDoc(docRef, {
				metaData: {
					createdByName: `${surname} ${name}`,
					createdByUid: user.uid,
					createdAtDatetime: datetime,
				},
				companyName,
				workbase,
				email,
				displayName: `${name} ${surname}`,
				phoneNumber,
				online: true,
				photoUrl: "",
				status: "active",
			});

			const idToken = await auth.currentUser.getIdTokenResult(true);
			// console.log(`idToken.claims.roles`, idToken.claims.roles)

			// send email to th user for verification
			// await sendEmailVerification(auth.currentUser);

			dispatch({
				type: "SIGNIN",
				payload: {
					...user,
					claims: idToken.claims.roles,
				},
			});
			setIsPending(false);
			setError(null);
			setSuccess(true);
		} catch (err) {
			setIsPending(false);
			setError(err.message);
			setSuccess(false);
			// console.log(`signup err`, err.message);
		}
	};

	return { signup, error, isPending, success };
};
