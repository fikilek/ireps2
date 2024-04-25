import {
	updateDoc,
	doc,
	Timestamp,
	onSnapshot,
	collection,
	addDoc,
	deleteDoc,
	setDoc,
	// deleteDoc,
} from "firebase/firestore";
// import cloneDeep from "lodash.clonedeep";
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
	// console.log(`firestoreReducer action`, action);
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
			console.log(`ERROR`, action.payload);
			return {
				document: null,
				error: action.payload,
				isPending: false,
				success: false,
			};
		case "DELETED_DOCUMENT":
			// console.log(`UPDATED_DOCUMENT`, action.payload);
			return {
				document: action.payload,
				error: null,
				isPending: false,
				success: true,
			};
		default:
			console.log(
				`DEFAULT - Error adding/updating firestore doc - action.payload`,
				action.payload
			);
			throw new Error(`Error adding/updating firestore doc`);
	}
};

export const useFirestore = fbCollection => {
	// console.log(`useFirestore fbCollection:`, fbCollection);
	const { user } = useAuthContext();

	const [response, dispatch] = useReducer(firestoreReducer, initData);
	// console.log(`response`, response);

	const [isCancelled, setIsCancelled] = useState(false);
	// console.log(`isCancelled`, isCancelled);

	const dispatchIfNotCancelled = action => {
		// console.log(`action`, action);
		// console.log(`isCancelled`, isCancelled);
		if (!isCancelled) {
			dispatch(action);
		}
	};

	const ref = collection(db, fbCollection);

	const addDocument = async doc => {
		dispatch({ type: "IS_PENDING" });
		try {
			const addedDocument = await addDoc(ref, {
				...doc,
				metadata: {
					...doc.metadata,
					updatedAtDatetime: Timestamp.now(),
					updatedByUser: user.displayName,
					updatedByUid: user.uid,
				},
			});
			// console.log(`addedDocument`, addedDocument);
			dispatchIfNotCancelled({ type: "ADD_DOCUMENT", payload: addedDocument });
		} catch (err) {
			dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
		}
	};

	const deleteDocument = async id => {
		// console.log(`Delete doc`, id);

		dispatch({ type: "IS_PENDING" });
		const docToDeleteRef = doc(db, fbCollection, id);
		try {
			deleteDoc(docToDeleteRef).then(result => {
				dispatchIfNotCancelled({ type: "DELETED_DOCUMENT", payload: id });
			});
		} catch (err) {
			console.log(`ERROR deleting doc [${id}]: `, err.message);
			dispatchIfNotCancelled({
				type: "ERROR",
				payload: err.message,
			});
		}
	};

	const updateDocument = async (document, id) => {
		// console.log(`updateDocument`, document, id);
		document = {
			...document,
			"metadata.updatedAtDatetime": Timestamp.now(),
			"metadata.updatedByUser": user.displayName,
			"metadata.updatedByUserId": user.uid,
		};

		dispatch({ type: "IS_PENDING" });
		const docToUpdateRef = doc(db, fbCollection, id);
		try {
			updateDoc(docToUpdateRef, document).then(result => {
				dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT" });
			});
		} catch (err) {
			console.log(`ERROR: `, err.message);
			dispatchIfNotCancelled({
				type: "ERROR",
				payload: err.message,
			});
		}
	};

	const getDocument = async id => {
		// console.log(`getDocument id:`, id);
		const docRef = doc(db, fbCollection, id);
		dispatch({ type: "IS_PENDING" });
		try {
			onSnapshot(docRef, doc => {
				// console.log(`doc.data()`, doc.data());
				if (doc.exists()) {
					dispatchIfNotCancelled({
						type: "UPDATED_DOCUMENT",
						payload: {
							id: doc.id,
							...doc.data(),
						},
					});
				} else {
					console.log("No such document!");
				}
			});
		} catch (err) {
			dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
		}
	};

	const setDocument = async (document, id) => {
		// console.log(`updateDocument`, document, id);
		document = {
			...document,
			metadata: {
				...document.metadata,
				updatedAtDatetime: Timestamp.now(),
				updatedByUser: user.displayName,
				updatedByUserId: user.uid,
			},
		};

		dispatch({ type: "IS_PENDING" });
		const docToUpdateRef = doc(db, fbCollection, id);
		try {
			setDoc(docToUpdateRef, document).then(result => {
				dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT" });
			});
		} catch (err) {
			console.log(`ERROR: `, err.message);
			dispatchIfNotCancelled({
				type: "ERROR",
				payload: err.message,
			});
		}
	};

	useEffect(() => {
		// console.log(`running cleanup`);
		setIsCancelled(false);
		return () => {
			setIsCancelled(true);
		};
	}, []);

	return {
		response,
		addDocument,
		deleteDocument,
		updateDocument,
		getDocument,
		setDocument,
	};
};
