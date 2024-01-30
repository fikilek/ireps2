import {
	collection,
	addDoc,
	updateDoc,
	doc,
	getDoc,
	arrayUnion,
	Timestamp,
} from "firebase/firestore";
import cloneDeep from "lodash.clonedeep";
import { useEffect, useReducer, useState } from "react";
import { db } from "../firebaseConfig/fbConfig";
import useAuthContext from "./useAuthContext";

const initData = {
	document: null,
	error: null,
	isPending: null,
	success: null,
};

const firestoreReducer = (state, action) => {
	// console.log(`action`, action);
	switch (action.type) {
		case "IS_PENDING":
			// console.log(`IS_PENDING`, action.payload);
			return {
				document: null,
				error: null,
				isPending: true,
				success: false,
			};
		case "ADD_DOCUMENT":
			// console.log(`ADD_DOCUMENT`, action.payload);
			return {
				document: action.payload,
				error: null,
				isPending: false,
				success: true,
			};
		case "UPDATED_DOCUMENT":
			// console.log(`UPDATED_DOCUMENT`, action.payload);
			return {
				document: action.payload,
				error: null,
				isPending: false,
				success: true,
			};
		case "ERROR":
			// console.log(`ERROR`, action.payload);
			return {
				document: null,
				error: action.payload,
				isPending: false,
				success: false,
			};
		default:
			// console.log(`DEFAULT`, action.payload);
			throw new Error(`Error adding new doc [${action.payload}] to firestore`);
		// return state;
	}
};

export const useFirestore = fbCollection => {
	// get currnet user data
	const { user } = useAuthContext();
	// console.log(`user`, user)

	const [response, dispatch] = useReducer(firestoreReducer, initData);
	const [isCancelled, setIsCancelled] = useState(false);
	// console.log(`isCancelled`, isCancelled);
	// console.log(`response`, response);
	// console.log(`myDoc`, myDoc);

	const dispatchIfNotCancelled = action => {
		if (!isCancelled) {
			// console.log(`action NOT CANCELLED`, action);
			dispatch(action);
		}
	};

	const ref = collection(db, fbCollection);

	const addDocument = async doc => {
		// console.log(`addDocument`, doc)

		dispatch({ type: "IS_PENDING" });
		try {
			// console.log(`po`, po);
			const addedDocument = await addDoc(ref, {
				...doc,
				metaData: {
					...doc.metaData,
					updatedAtDatetime: Timestamp.now(),
					updatedByUser: user.displayName,
					updatedByUserId: user.uid,
				},
			});
			dispatchIfNotCancelled({ type: "ADD_DOCUMENT", payload: addedDocument });
			// console.log(`addedDocument`, addedDocument);
		} catch (err) {
			dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
		}
	};

	const deleteDocument = async id => {};

	const updateDocument = async document => {
		// console.log(`updateDocument`, document);

		document = {
			...document,
			metaData: {
				...document.metaData,
				updatedAtDatetime: Timestamp.now(),
				updatedByUser: user.displayName,
				updatedByUserId: user.uid,
			},
		};

		const id = document.id;
		const newObj = cloneDeep(document);
		// delete newObj.id;
		dispatch({ type: "IS_PENDING", payload: newObj });
		// console.log(`id`, id)
		const docToUpdateRef = doc(db, fbCollection, id);
		try {
			// console.log(`po`, po)
			const updatedDoc = await updateDoc(docToUpdateRef, newObj);
			dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDoc });
			// return updatedDoc;
		} catch (err) {
			console.log(`ERROR: `, err.message);
			dispatchIfNotCancelled({
				type: "ERROR",
				payload: err.message,
			});
		}
	};

	const updateDocumentArray = async (id, arrayData, arrayName) => {
		// console.log(`id`, id);
		// console.log(`arrayData`, arrayData);
		// console.log(`arrayName`, arrayName);

		dispatch({ type: "IS_PENDING", payload: arrayData });
		const docToUpdateRef = doc(db, fbCollection, id);
		try {
			const updatedDoc = await updateDoc(docToUpdateRef, {
				astNoMedia: arrayUnion(arrayData),
			});
			// console.log(`updatedDoc`, updatedDoc);
			dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDoc });
			return updatedDoc;
		} catch (err) {
			// console.log(`err`, err.message);
			dispatchIfNotCancelled({
				type: "ERROR",
				payload: err.message,
			});
		}
	};

	const getDocument = async uid => {
		// console.log(`uid`, uid);
		const docRef = doc(db, fbCollection, uid);
		// console.log(`docRef`, docRef);
		dispatch({ type: "IS_PENDING" });
		try {
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				// console.log("Document data:", docSnap.data());
				dispatchIfNotCancelled({
					type: "UPDATED_DOCUMENT",
					payload: docSnap.data(),
				});
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		} catch (err) {
			dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
		}
	};

	useEffect(() => {
		return () => {
			// console.log(`useEffect returning`);
			setIsCancelled(true);
		};
	}, []);

	return {
		response,
		addDocument,
		deleteDocument,
		updateDocument,
		updateDocumentArray,
		getDocument,
	};
};
