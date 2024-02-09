import "./TableUsersRoles.css";

import { userRoles } from "../../utils/utils";

const TableUsersRoles = params => {
	console.log(`params.data`, params.data);
	const { roles } = params.data.customClaims;
	// console.log(`roles`, roles);

	return (
		<div className="table-users-roles">
			{userRoles &&
				userRoles.map(role => {
					const hasRole = roles[role.key] ? "hasRole" : "";
					return (
						<button
							key={role.name}
							className={`table-btn ${hasRole}`}
							title={role.name}
						>
							{role.abreviation}
						</button>
					);
				})}
		</div>
	);
};

export default TableUsersRoles;
