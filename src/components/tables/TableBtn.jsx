import React from "react";

const TableBtn = myProps => {
	console.log(`myProps`, myProps);
	const { icon, viewToOpen } = myProps;
	return (
		<div className="table-btn">
			<button>{icon}</button>
		</div>
	);
};

export default TableBtn;
