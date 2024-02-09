import React from "react";
import UserData from "./UserData";
import UserProfileHeader from "./UserProfileHeader";
import UserStats from "./UserStats";

const UserProfile = () => {
	return (
		<div className="user-profile">
			<UserProfileHeader />
			<div className="user-section">
				<UserData />
				<UserStats />
			</div>
		</div>
	);
};

export default UserProfile;
