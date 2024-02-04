import useModal from "../../hooks/useModal";
import "./UserDataEditBtn.css";

const UserDataEditBtn = props => {
	// console.log(`UserDataEditBtn props`, props);
	const { openModal } = useModal();
	const handleClick = e => {
		openModal({
			modalName: "updateUser",
			payload: props.formData,
		});
	};
	return (
		<div className="user-data-edit-btn">
			<button onClick={handleClick}>
				<p>Edit user</p>
			</button>
		</div>
	);
};

export default UserDataEditBtn;
