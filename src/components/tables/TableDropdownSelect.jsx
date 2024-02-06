import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

const options = [
	{ key: "active", value: "active" },
	{ key: "suspended", value: "suspended" },
];

const TableDropdownSelect = params => {
	const [selectValue, setSelectValue] = useState("");

	const { id } = params?.data;
	const { value } = params;

	const { updateDocument } = useFirestore("users");

	const handleChange = e => {
		setSelectValue(e.target.value);
		updateDocument({ status: e.target.value }, id);
	};

	useEffect(() => {
		setSelectValue(value);
	}, [value]);

	return (
		<div className="table-dropdown-select">
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

export default TableDropdownSelect;
