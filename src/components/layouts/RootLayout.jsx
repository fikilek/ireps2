import { useState } from "react";
import "./Layout.css";
import SignedInLayout from "./SignedInLayout";
import SignedOutLayout from "./SignedOutLayout";

const RootLayout = () => {
	const [user, setUser] = useState(null);
	return (
		<div className="root-layout">
			{user ? <SignedInLayout /> : <SignedOutLayout />}
		</div>
	);
};

export default RootLayout;
