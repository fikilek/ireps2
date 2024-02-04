import useAuthContext from "../../hooks/useAuthContext";
import useModal from "../../hooks/useModal";
import "./UserAuthField.css";
import UserDataField from "./UserDataField";
import UserEmailVerified from "./UserEmailVerified";

const UserAuthField = props => {
	console.log(`props`, props);
	const { fieldKey, fieldValue, verified } = props;
	const { user } = useAuthContext();

	const { openModal } = useModal();

	let btnToShow = null;
	let modalToOpen = null;

	if (fieldKey === "Email") {
		btnToShow = user.emailVerified ? <UserEmailVerified /> : "Verify";
		modalToOpen = "editUserEmail";
	}
	if (fieldKey === "Phone No") {
		btnToShow = "Verify";
		modalToOpen = "editUserPhoneNumber";
	}

	const handleClick = e => {
		openModal({
			modalName: modalToOpen,
			payload: fieldValue,
		});
	};

	return (
		<div className="user-auth-field">
			<UserDataField fieldKey={fieldKey} fieldValue={fieldValue} />
			<div className="user-auth-field-btn">
				<button onClick={handleClick}>Edit</button>
			</div>
			<div className="user-auth-field-btn">
				{
					<button className={`${verified === true ? "verified" : "not-verified"}`}>
						{btnToShow}
					</button>
				}
			</div>
		</div>
	);
};

export default UserAuthField;
