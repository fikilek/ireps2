import { capitalizeFirstLetter } from "../../utils/utils";
import "./UserRoleDisplay.css";

const UserRoleDisplay = props => {
	// console.log(`props`, props);
	const { role } = props;
	return (
		<div className={`user-role-display ${role[1] && "text-emphasis2"}`}>
			<p>{capitalizeFirstLetter(role[0])} </p>
			<p>{role[1] ? "Yes" : "No"}</p>
		</div>
	);
};

export default UserRoleDisplay;
