import React from "react";

const UserDataHeader = props => {
	const { udLl, udLr, udRl, udRr } = props;
	return (
		<div className="user-data-header">
			<div className="udL">
				{udLl}
				{udLr}
			</div>
			<div className="udR">
				{udRl}
				{udRr}
			</div>
		</div>
	);
};

export default UserDataHeader;
