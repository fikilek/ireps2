import { useLocation, Navigate } from "react-router-dom";
import useAuthContext from "../../../hooks/useAuthContext";

export const RequireAuth = ({ children }) => {
	let { user } = useAuthContext();
	let location = useLocation();

	if (!user) {
		return <Navigate to="/" state={{ from: location }} replace />;
	} else {
		return children;
	}
};
