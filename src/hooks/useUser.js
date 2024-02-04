import { useEffect, useState } from "react";
import useAuthContext from "./useAuthContext";

export const useUser = () => {
	const [initials, setInitials] = useState("");

	const { user } = useAuthContext() || {};

	const { displayName } = user;

	useEffect(() => {
		if (displayName) {
			const firstLetterSurname = displayName
				.split(" ")[0]
				.slice(0, 1)
				.toUpperCase();
			const firstLetterName = displayName.split(" ")[1].slice(0, 1).toUpperCase();
			setInitials(`${firstLetterSurname}${firstLetterName}`);
		}
	}, [displayName]);

	return { initials };
};
