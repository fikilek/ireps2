import {
	collection,
	addDoc,
	updateDoc,
	doc,
	getDoc,
	arrayUnion,
	Timestamp,
	onSnapshot,
} from "firebase/firestore";
// import cloneDeep from "lodash.clonedeep";
import { useEffect, useReducer, useRef, useState } from "react";
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
	// console.log(`useFirestore fbCollection:`, fbCollection);
	const { user } = useAuthContext();

	const [response, dispatch] = useReducer(firestoreReducer, initData);
	const [isCancelled, setIsCancelled] = useState(false);
	// console.log(`response`, response);

	const dispatchIfNotCancelled = action => {
		if (!isCancelled) {
			dispatch(action);
		}
	};

	const ref = collection(db, fbCollection);

	// const addDocument = async doc => {
	// 	dispatch({ type: "IS_PENDING" });
	// 	try {
	// 		const addedDocument = await addDoc(ref, {
	// 			...doc,
	// 			metaData: {
	// 				...doc.metaData,
	// 				updatedAtDatetime: Timestamp.now(),
	// 				updatedByUser: user.displayName,
	// 				updatedByUserId: user.uid,
	// 			},
	// 		});
	// 		dispatchIfNotCancelled({ type: "ADD_DOCUMENT", payload: addedDocument });
	// 	} catch (err) {
	// 		dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
	// 	}
	// };

	// const deleteDocument = async id => {};

	// const updateDocument = async document => {
	// 	document = {
	// 		...document,
	// 		metaData: {
	// 			...document.metaData,
	// 			updatedAtDatetime: Timestamp.now(),
	// 			updatedByUser: user.displayName,
	// 			updatedByUserId: user.uid,
	// 		},
	// 	};

	// 	const id = document.id;
	// 	const newObj = cloneDeep(document);
	// 	dispatch({ type: "IS_PENDING", payload: newObj });
	// 	const docToUpdateRef = doc(db, fbCollection, id);
	// 	try {
	// 		const updatedDoc = await updateDoc(docToUpdateRef, newObj);
	// 		dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDoc });
	// 	} catch (err) {
	// 		console.log(`ERROR: `, err.message);
	// 		dispatchIfNotCancelled({
	// 			type: "ERROR",
	// 			payload: err.message,
	// 		});
	// 	}
	// };

	// const updateDocumentArray = async (id, arrayData, arrayName) => {
	// 	dispatch({ type: "IS_PENDING", payload: arrayData });
	// 	const docToUpdateRef = doc(db, fbCollection, id);
	// 	try {
	// 		const updatedDoc = await updateDoc(docToUpdateRef, {
	// 			astNoMedia: arrayUnion(arrayData),
	// 		});
	// 		dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDoc });
	// 		return updatedDoc;
	// 	} catch (err) {
	// 		dispatchIfNotCancelled({
	// 			type: "ERROR",
	// 			payload: err.message,
	// 		});
	// 	}
	// };

	const getDocument = async id => {
		// console.log(`getDocument id:`, id);
		const docRef = doc(db, fbCollection, id);
		dispatch({ type: "IS_PENDING" });
		try {
			const unsub = onSnapshot(docRef, doc => {
				// console.log(`doc.data()`, doc.data());
				if (doc.exists()) {
					dispatchIfNotCancelled({
						type: "UPDATED_DOCUMENT",
						payload: doc.data(),
					});
				} else {
					console.log("No such document!");
				}
			});
		} catch (err) {
			dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
		}
	};

	useEffect(() => {
		return () => {
			setIsCancelled(true);
		};
	}, []);

	return {
		response,
		// addDocument,
		// deleteDocument,
		// updateDocument,
		// updateDocumentArray,
		getDocument,
	};
};
