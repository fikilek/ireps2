import useCollection from "../../hooks/useCollection";

const SystemTables = () => {
	const result = useCollection("systemTables", [
		"metaData.createdByName",
		"==",
		"kentane fikile",
	]);
	return (
		<div>
			<h2>System Tables</h2>
		</div>
	);
};

export default SystemTables;
