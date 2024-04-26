import { useState, useEffect } from "react";
import { db } from "../firebaseConfig/fbConfig";
import { doc, onSnapshot } from "firebase/firestore";

export const useDocument = (fbCollection, id) => {
	// console.log(`fbCollection`, fbCollection);
	// console.log(`id`, id);

	const [document, setDocument] = useState(null);
	const [error, setError] = useState(null);
	// console.log(`document`, document);

	useEffect(() => {
		let unsub = null;
		if (!id) return;
		const docRef = doc(db, fbCollection, id);
		// console.log(`docRef`, docRef);
		unsub = onSnapshot(
			docRef,
			snapShot => {
				// console.log(`snapShot`, snapShot);
				setDocument({ ...snapShot.data(), id: snapShot.id });
			},
			error => {
				console.log(`document fetch error`, error.message);
				setError(`Failed to get document`, id);
			}
		);

		return () => {
			if (unsub) {
				unsub();
			}
		};
	}, [id, fbCollection]);

	return { error, document };
};
