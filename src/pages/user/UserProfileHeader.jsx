import React from "react";
import "./User.css";
import { useSignout } from "../../hooks/useSignout";

const UserProfileHeader = () => {
	const { signout } = useSignout();
	return (
		<div className="user-profile-header">
			<div className="uph ph-left">
				<p>User Profile</p>
				<p></p>
			</div>
			<div className="uph uph-right">
				<button onClick={() => signout()}>Signout</button>
			</div>
		</div>
	);
};

export default UserProfileHeader;
