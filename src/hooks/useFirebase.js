export const useFirebase = () => {
	const getCustomError = error => {
		console.log(`error`, error);
		return error.split("/")[1].replaceAll("-", " ").slice(0, -2);
	};

	return { getCustomError };
};
