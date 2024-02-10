import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const options = [
	{ key: "enabled", value: "enabled" },
	{ key: "disabled", value: "disabled" },
];

const TableUserAccDisableSelect = params => {
	const { disabled, uid, displayName } = params?.data;

	const [selectValue, setSelectValue] = useState("");

	const functions = getFunctions();
	const disableUserAcc = httpsCallable(functions, "disableUserAcc");

	const handleChange = e => {
		console.log(`e.target.value - disabled: `, e.target.value);
		setSelectValue(e.target.value);
		disableUserAcc({
			uid,
			action: e.target.value === "disabled" ? true : false,
		})
			.then(result => {
				console.log(`result.data`, result);
				toast.success(
					`User acc [${displayName}] succesfully ${
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

	useEffect(() => {
		setSelectValue(disabled ? "disabled" : "enabled");
	}, []);

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
