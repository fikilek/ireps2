import "./TableUsersRoles.css";

import { userRoles } from "../../utils/utils";
import useAuthContext from "../../hooks/useAuthContext";
import useModal from "../../hooks/useModal";
import { useContext, useEffect, useState } from "react";
import { ClaimsContext } from "../../contexts/ClaimsContext";

const TableUsersRoles = params => {
	// console.log(`params`, params);

	const { roles: roles_ } = params?.data?.customClaims;

	const { customClaims, setCustomClaims } = useContext(ClaimsContext);
	// console.log(`customClaims`, customClaims);

	const [roles, setRoles] = useState({});

	const { uid } = params?.data;

	const customClaimsUid = customClaims?.uid;

	useEffect(() => {
		if (uid === customClaimsUid && customClaims.roles) {
			setRoles(customClaims.roles);
		} else {
			setRoles(roles_);
		}
	}, [customClaims]);

	const { openModal } = useModal();

	const { user } = useAuthContext();

	const selectDisabled = uid === user.uid || params.data.disabled ? true : false;

	const handleClick = e => {
		setCustomClaims({
			uid,
			roles,
		});
		openModal({
			modalName: "editUserRoles",
			payload: params.data,
		});
	};

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
							onClick={handleClick}
						>
							{role.abreviation}
						</button>
					);
				})}
		</div>
	);
};

export default TableUsersRoles;
