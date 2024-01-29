import React from "react";
import UserDetails from "./UserDetails";
import UserProfileHeader from "./UserProfileHeader";
import UserStats from "./UserStats";

const UserProfile = props => {
	console.log(`props`, props);

	// console.log(userId);
	return (
		<div className="user-profile">
			<UserProfileHeader />
			<div className="user-section">
				<UserDetails />
				<UserStats />
			</div>
		</div>
	);
};

export default UserProfile;
