import "./TableUserAccDisableSelect.css";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuthContext from "../../hooks/useAuthContext";

const options = [
	{ key: "enabled", value: "enabled" },
	{ key: "disabled", value: "disabled" },
];

const TableUserAccDisableSelect = params => {
	// console.log(`params`, params);
	const { disabled, uid, displayName } = params?.data;

	const { user } = useAuthContext();
	// console.log(`user.uid`, user.uid);

	const selectDisabled = uid === user.uid ? true : false;

	const [selectValue, setSelectValue] = useState("");

	const functions = getFunctions();
	const disableUserAcc = httpsCallable(functions, "disableUserAcc");

	const handleChange = e => {
		// console.log(`e.target.value - disabled: `, e.target.value);
		// setSelectValue(e.target.value);
		disableUserAcc({
			uid,
			action: e.target.value === "disabled" ? true : false,
		})
			.then(result => {
				// make the disabled row selected
				console.log(`row node id: `, params.data.id);

				// get the node using params.data.id
				const node = params.api.getRowNode(params.data.id);
				console.log(`row node: `, node);

				// call grid api setDataVale to update the new 'disabled' value
				console.log(`node.data.disabled BRFORE update: `, node.data.disabled);
				node.setDataValue("disabled", node.data.disabled);
				console.log(`node.data.disabled AFTER update: `, node.data.disabled);

				// params.api.forEachNode(node => {
				console.log(`selected node.data: `, node.data);
				// 	if (node.data.disabled) {
				// 		node.setSelected(true, false);
				// 	} else {
				// 		node.setSelected(false, false);
				// 	}
				// 	console.log(`disabled? : `, node.isSelected());
				// });

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
		<div className="table-user-acc-disable-select">
			<select
				onChange={handleChange}
				value={selectValue}
				disabled={selectDisabled}
				className="table-btn"
			>
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
