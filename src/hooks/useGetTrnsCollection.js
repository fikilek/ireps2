import { useContext, useEffect, useReducer } from "react";
import { db } from "../firebaseConfig/fbConfig";
import {
	collection,
	limit,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { TrnsContext } from "../contexts/TrnsContext";

const initData = {
	data: [],
	error: null,
	isPending: null,
	success: null,
};

const colReducer = (state, action) => {
	// console.log(`state`, state);
	// console.log(`action`, action);
	switch (action.type) {
		default:
			return state;
		case "IS_PENDING":
			// console.log(`action.type`, action.type);
			return {
				data: [],
				isPending: true,
				success: false,
				error: "",
			};
		case "SUCCESS":
			return {
				data: action.payload,
				error: false,
				isPending: false,
				success: true,
			};
		case "ERROR":
			return {
				data: [],
				isPending: false,
				success: false,
				error: action.payoad,
			};
	}
};

const useGetTrnsCollection = col => {
	// console.log(`col`, col);
	// console.log(`_query`, _query);

	const { trnsContext, setTrnsContext } = useContext(TrnsContext);
	// console.log(`trnsContext`, trnsContext);

	const [state, dispatch] = useReducer(colReducer, initData);
	// console.log(`state`, state);

	useEffect(() => {
		if (state.data.length > 0) {
			setTrnsContext({
				...trnsContext,
				trns: state.data,
			});
		}
	}, [state, state.data, setTrnsContext]);

	let colRef = collection(db, col);

	const getCollection = _query => {
		// console.log(`..._query`, ..._query);
		let newQuery;

		if (_query) {
			newQuery = query(
				colRef,
				orderBy("metadata.updatedAtDatetime", "desc"),
				where(..._query),
				limit(500)
			);
		} else {
			newQuery = query(colRef, orderBy("metadata.updatedAtDatetime", "desc"));
		}

		dispatch({ type: "IS_PENDING" });

		onSnapshot(
			newQuery,
			snapShot => {
				const results = [];
				console.log(`snapShot`, snapShot);
				snapShot.docs.forEach(doc => {
					results.push({ id: doc.id, ...doc.data() });
				});
				dispatch({ type: "SUCCESS", payload: results });
				if (results?.length > 0) {
					setTrnsContext({
						...trnsContext,
						trns: results,
					});
				}
			},
			error => {
				console.log(`firestore err`, error.message);
				dispatch({ type: "ERROR", payload: error.message });
			}
		);
	};

	return { state, getCollection };
};

export default useGetTrnsCollection;
