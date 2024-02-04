import useCollection from "../../hooks/useCollection";

const Users = () => {
	const result = useCollection("users", [
		"metaData.createdByName",
		"==",
		"kentane fikile",
	]);
	return (
		<div>
			<h2>Users Page</h2>
		</div>
	);
};

export default Users;
