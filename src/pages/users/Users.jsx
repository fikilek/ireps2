import TableUsers from "../../components/tables/TableUsers";
import { useUsers } from "../../hooks/useUsers";

const Users = () => {
	const { usersTableFields, users } = useUsers();
	return (
		<div className="table">
			<TableUsers rowData={users} colDefs={usersTableFields} />
		</div>
	);
};

export default Users;
//
