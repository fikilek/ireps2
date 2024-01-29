import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";

const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw Error("AuthContext not provided");
	}
	return context;
};

export default useAuthContext;
