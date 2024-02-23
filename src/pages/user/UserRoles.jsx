import "./UserRoles.css";
import UserRolesDisplay from "./UserRolesDisplay";

const UserRoles = props => {
	// console.log(`props`, props);
	const { roles } = props;
	return (
		<div className="user-roles-claims">
			<div className="ur-section url">Roles:</div>
			<div className="ur-section urr">
				<UserRolesDisplay roles={roles} />
			</div>
		</div>
	);
};

export default UserRoles;
