import { useState } from "react";
import "./Layout.css";
import SignedInLayout from "./SignedInLayout";
import SignedOutLayout from "./SignedOutLayout";
import useAuthContext from "../../hooks/useAuthContext";

const RootLayout = () => {
	const { user } = useAuthContext();
	return (
		<div className="root-layout">
			{user ? <SignedInLayout /> : <SignedOutLayout />}
		</div>
	);
};

export default RootLayout;
