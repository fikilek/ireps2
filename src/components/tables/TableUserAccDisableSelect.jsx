import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";

const options = [
	{ key: "enabled", value: "enabled" },
	{ key: "disabled", value: "disabled" },
];

const TableUserAccDisableSelect = params => {
	// console.log(`params`, params);
	const { disabled, uid } = params?.data;

	const [selectValue, setSelectValue] = useState("");

	const functions = getFunctions();
	const disableUserAcc = httpsCallable(functions, "disableUserAcc");

	const handleChange = e => {
		// console.log(`e.target.value`, e.target.value);
		setSelectValue(e.target.value);
		disableUserAcc({
			uid,
			action: e.target.value === "disabled" ? true : false,
		}).then(result => {
			console.log(`result.data`, result.data);
		});
	};

	useEffect(() => {
		setSelectValue(disabled ? "disabled" : "enabled");
	}, [disabled]);

	return (
		<div className="table-user-acc-disble-select">
			<select onChange={handleChange} value={selectValue}>
				{options &&
					options.map(option => {
						return (
							<option key={option.value} value={option.value}>
								{option.key}
							</option>
						);
					})}
			</select>
		</div>
	);
};

export default TableUserAccDisableSelect;
