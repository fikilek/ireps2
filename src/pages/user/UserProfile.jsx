import React from "react";
import UserDeta from "./UserData";
import UserProfileHeader from "./UserProfileHeader";
import UserStats from "./UserStats";

const UserProfile = () => {
	return (
		<div className="user-profile">
			<UserProfileHeader />
			<div className="user-section">
				<UserDeta />
				<UserStats />
			</div>
		</div>
	);
};

export default UserProfile;
