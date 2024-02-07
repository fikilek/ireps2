import "./User.css";
import React from "react";
import UserDataHeader from "./UserDataHeader";

const UserStats = () => {
	const udLl = <p className="data-emphasis">User Stats</p>;
	const udLr = <p className="data-emphasis"></p>;
	const udRl = <p className="data-emphasis"></p>;
	const udRr = <p className="data-emphasis"></p>;
	return (
		<div className="user-data user-details">
			<UserDataHeader udLl={udLl} udLr={udLr} udRl={udRl} udRr={udRr} />
			<div className="body user-details-body">
				<div className="body-section body-left">Left</div>
				<div className="body-section body-right ">Right</div>
			</div>
		</div>
	);
};

export default UserStats;
