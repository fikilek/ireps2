import "./UserDataField.css";

const UserDataField = props => {
	const { fieldKey, fieldValue } = props;
	return (
		<div className="user-data-field">
			<p>{fieldKey}:</p>
			<p className="text-emphasis2">{fieldValue}</p>
		</div>
	);
};

export default UserDataField;
