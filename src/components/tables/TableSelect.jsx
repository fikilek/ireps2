import { getFunctions, httpsCallable } from "firebase/functions";
import "./TableSelect.css";
import { toast } from "react-toastify";
import { useState } from "react";

const TableSelect = props => {
	console.log(`props`, props);

	const { value, options, onValueChange } = props;

	const functions = getFunctions();
	const disableUserAcc = httpsCallable(functions, "disableUserAcc");

	const handleChange = e => {
		// console.log(`e.target.value`, e.target.value);
		onValueChange(e.target.value);
		props.api.redrawRows();
		disableUserAcc({
			uid: props.data.uid,
			action: e.target.value === "disabled" ? true : false,
		})
			// TODO: something I dont understand. e.target.value changes after data has been written to the DB. THis is strange. I should NOT change.
			.then(result => {
				// console.log(`result`, result);
				// console.log(`e.target.value`, e.target.value);
				toast.success(
					`User acc [${props.data.displayName}] succesfully ${
						e.target.value === "disabled" ? "DISABLED" : "ENABLED"
					}  `,
					{
						position: "bottom-left",
					}
				);
			})
			.catch(error => {
				console.log(`Error:`, error.message);
			});
	};

	return (
		<div className="table-user-acc-disable-select">
			{/* TODO: use a spinner (for pending works) to show activity while waiting to diasable or enable the user to finish */}
			<select value={value} className="table-btn" onChange={handleChange}>
				{options &&
					options.map(option => {
						return (
							<option key={option} value={option}>
								{option}
							</option>
						);
					})}
			</select>
		</div>
	);
};

export default TableSelect;
