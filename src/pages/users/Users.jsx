import { useContext, useEffect, useState } from "react";
import TableUsers from "../../components/tables/TableUsers";
import { useUsers } from "../../hooks/useUsers";
import { ClaimsContext } from "../../contexts/ClaimsContext";

const Users = () => {
	const { usersTableFields, users } = useUsers();
	const [unps, setUnps] = useState([]);

	const { customClaims } = useContext(ClaimsContext);

	useEffect(() => {
		setUnps(users);
	}, [users]);

	useEffect(() => {
		if (!customClaims) return;

		// find the user to update role
		const userToUpdate = unps.find(unp => unp.uid === customClaims?.uid);

		// update the user role
		const updatedUser = {
			...userToUpdate,
			customClaims: {
				...userToUpdate?.customClaims,
				roles: customClaims?.roles,
			},
		};

		// find the index of the updated uer
		const index = unps.findIndex(unp => unp.uid === customClaims?.uid);

		// update unp at the index`
		const newUnps = unps?.with(index, updatedUser);
		console.log(`newUnps`, newUnps);

		// update the state
		setUnps(newUnps);
	}, [customClaims]);

	return (
		<div className="table">
			<TableUsers rowData={unps} colDefs={usersTableFields} />
		</div>
	);
};

export default Users;
//
