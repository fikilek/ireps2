import UserRoleDisplay from "./UserRoleDisplay";
import "./UserRolesDisplay.css";

const UserRolesDispaly = props => {
	// console.log(`props`, props);
	const { roles } = props;

	return (
		<div className="user-roles-display">
			{roles &&
				Object.entries(roles).map(role => {
					return <UserRoleDisplay key={role} role={role} />;
				})}
		</div>
	);
};

export default UserRolesDispaly;
