import TableUsers from "../../components/tables/TableUsers";
import useCollection from "../../hooks/useCollection";
import { useUsers } from "../../hooks/useUsers";

const Users = () => {
	const result = useCollection("users");
	// console.log(`result`, result);

	const { usersTableFields } = useUsers();
	// console.log(`usersTableFields`, usersTableFields);

	return (
		<div className="table">
			<TableUsers rowData={result.data} colDefs={usersTableFields} />
		</div>
	);
};

export default Users;
