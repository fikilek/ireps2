import { useEffect, useState } from "react";
import "./TableUserDisabledCheckBox.css";

const TableUserDisabledCheckBox = props => {
	console.log(`props`, props);

	const { value, options, onValueChange } = props;

	// State for storing the selected option. Default is "Male"
	const [selectedOption, setSelectedOption] = useState("Male");
	console.log(`selectedOption`, selectedOption);

	useEffect(() => {
		setSelectedOption(value);
	}, [value]);

	const handleChange = e => {
		console.log(`e.target.value`, e.target.value);
		onValueChange(e.target.value);
		setSelectedOption(prev => (prev = e.target.value));
	};

	return (
		<div className="table-user-acc-disable-select">
			<select
				value={selectedOption}
				// disabled={selectDisabled}
				className="table-btn"
				onChange={handleChange}
			>
				{options &&
					options.map(option => {
						return (
							<label>
								<input
									type="radio"
									value={selectedOption}
									// Checking this radio button if the selected option is "Male"
									checked={selectedOption === option}
									onChange={onValueChange}
								/>
								{selectedOption ? "disabled" : "enabled"}
							</label>
						);
					})}
			</select>
		</div>
	);
};

export default TableUserDisabledCheckBox;
