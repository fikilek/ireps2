import { format } from "date-fns";
import TableDropdownSelect from "../components/tables/TableDropdownSelect";

export const useUsers = props => {
	const usersTableFields = [
		{
			field: "uid",
			headerName: "users Id",
			width: 280,
			hide: true,
		},
		{
			field: "status",
			headerName: "Acc Status",
			width: 150,
			cellRenderer: TableDropdownSelect,
		},
		{
			field: "metadata.createdAtDatetime",
			headerName: "Date Created",
			width: 180,
			cellRenderer: params => {
				const datetime = params?.data?.metaData?.createdAtDatetime;
				return <p>{format(datetime.toDate(), "yyyy-MMM-dd HH:mm")}</p>;
			},
		},
		{
			field: "displayName",
			headerName: "Display Name",
			width: 170,
			cellRenderer: params => {
				const { surname, name } = params.data;
				return `${surname} ${name}`;
			},
		},
		{
			field: "email",
			headerName: "Email Adr",
			width: 200,
		},
		{
			field: "photoURL",
			headerName: "Photo",
			width: 100,
		},
		{
			field: "phoneNumber",
			headerName: "Phone Number",
			width: 150,
		},
		{
			field: "companyName",
			headerName: "Company Name",
			width: 170,
		},
		{
			field: "workbase",
			headerName: "Workbase",
			width: 150,
		},
		{
			field: "online",
			headerName: "Online",
			width: 100,
		},
	];

	return { usersTableFields };
};
