import "./TableSelect.css";

const TableSelect = props => {
	// console.log(`props`, props);

	const { value, options, onValueChange } = props;

	const handleChange = e => {
		console.log(`e.target.value`, e.target.value);
		onValueChange(e.target.value);
	};

	return (
		<div className="table-user-acc-disable-select">
			<select
				value={value}
				// disabled={selectDisabled}
				className="table-btn"
				onChange={handleChange}
			>
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
