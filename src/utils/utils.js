//  functions

import { ClockLoader } from "react-spinners";

export const capitalizeFirstLetter = string => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

// capitalize first letter of name and surname
export const capitalizeFirstLetters = obj => {
	for (const property in obj) {
		if (property === "surname" || property === "name") {
			const newStr = capitalizeFirstLetter(obj[property]);
			obj = {
				...obj,
				[property]: newStr,
			};
		}
	}
	return obj;
};

// constants
export const constants = {
	dateFormat1: "yyyy MMM dd: HH:mm",
};

// loaders
export const loader = (
	<ClockLoader
		color="blue"
		loading={true}
		size={150}
		aria-label="Loading Spinner"
		data-testid="loader"
		cssOverride={{
			margin: "auto",
		}}
	/>
);
