import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";

export const useFirebase = () => {
	const getCustomError = error => {
		// console.log(`error`, error);
		return error.split("/")[1].replaceAll("-", " ").slice(0, -2);
	};

	// fb - firebase
	// Ts - Timestamp
	const getStrFromFbTimestamp = (fbTs, dateFormat) => {
		const timestamp = new Timestamp(fbTs.seconds, fbTs.nanoseconds);
		return format(timestamp.toDate(), dateFormat);
	};

	return { getCustomError, getStrFromFbTimestamp };
};
