import { useState, useEffect, useRef } from "react";
import { db } from "../firebaseConfig/fbConfig";
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";

const useCollection = (fbCollection, _query) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState("");
	const [isPending, setIsPending] = useState(null);
	const [success, setSuccess] = useState(null);

	const q = useRef(_query).current;

	let colRef = collection(db, fbCollection);

	let newQuery;

	if (q) {
		newQuery = query(
			colRef,
			orderBy("metaData.createdAtDatetime", "desc"),
			where(...q)
		);
	} else {
		newQuery = query(colRef, orderBy("metaData.createdAtDatetime", "desc"));
	}

	useEffect(() => {
		setIsPending(true);
		setSuccess(false);
		setError("");

		const unsubscribe = onSnapshot(
			newQuery,
			snapShot => {
				const results = [];
				snapShot.docs.forEach(doc => {
					results.push({ id: doc.id, ...doc.data() });
				});
				setData(results);
			},
			err => {
				console.log(`firestore err`, err.message);
				setIsPending(false);
				setError(err.message);
			}
		);

		setIsPending(false);
		setSuccess(true);
		setError("");

		return () => unsubscribe();
	}, []);

	const getData = () => {
		return { data, error, isPending, success };
	};

	return { data, error, isPending, success, getData };
};

export default useCollection;
