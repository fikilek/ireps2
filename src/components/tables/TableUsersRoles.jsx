import "./TableUsersRoles.css";

import { userRoles } from "../../utils/utils";
import useAuthContext from "../../hooks/useAuthContext";

const TableUsersRoles = params => {
	const { roles } = params.data.customClaims;

	const { uid } = params.data;

	const { user } = useAuthContext();

	const selectDisabled = uid === user.uid ? true : false;

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
							disabled={selectDisabled}
						>
							{role.abreviation}
						</button>
					);
				})}
		</div>
	);
};

export default TableUsersRoles;
