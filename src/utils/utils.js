//  functions

import { ClockLoader } from "react-spinners";

export const capitalizeFirstLetter = string => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

// capitalize first letter of surnamem, name and nickName
export const capitalizeFirstLetters = obj => {
	for (const property in obj) {
		if (property === "surname" || property === "name"|| property === "nickName") {
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
	<div
		style={{
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			width: "100%",
			height: "100%",
		}}
	>
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
	</div>
);

// auth
export const userRoles = [
	{ key: "guest", abreviation: "GST", name: "Guest" },
	{ key: "fieldworker", abreviation: "FWR", name: "Field Worker" },
	{ key: "supervisor", abreviation: "SPV", name: "Supervisor" },
	{ key: "manager", abreviation: "MNG", name: "Manager" },
	{ key: "superuser", abreviation: "SPU", name: "Super User" },
];

// 
