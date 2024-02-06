import "./Layout.css";
import SignedInLayout from "./SignedInLayout";
import SignedOutLayout from "./SignedOutLayout";
import useAuthContext from "../../hooks/useAuthContext";

const RootLayout = () => {
	const { user, isAuthReady } = useAuthContext() || {};
	return (
		<div className="root-layout">
			{isAuthReady && (user ? <SignedInLayout /> : <SignedOutLayout />)}
		</div>
	);
};

export default RootLayout;
