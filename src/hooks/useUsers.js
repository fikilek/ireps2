import { format } from "date-fns";
import TableBtn from "../components/tables/TableBtn";
import { FaPenAlt } from "react-icons/fa";

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
			cellRenderer: TableBtn,
			cellRendererParams: {
				viewToOpen: "user",
				icon: <FaPenAlt />,
			},
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
		// {
		// 	field: "lastSigninDate",
		// 	headerName: "Last Signin Date",
		// 	width: 170,
		// 	cellRenderer: params => {
		// 		console.log(`params`, params);
		// 		return "Datetime";
		// 	},
		// },
		{
			field: "displayName",
			headerName: "display name",
			width: 170,
			cellRenderer: params => {
				const { surname, name } = params.data;
				return `${surname} ${name}`;
			},
		},
		{
			field: "email",
			headerName: "email adr",
			width: 200,
		},
		{
			field: "photoURL",
			headerName: "photo",
			width: 100,
		},
		{
			field: "phoneNumber",
			headerName: "phone number",
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
			headerName: "online",
			width: 100,
		},
	];

	return { usersTableFields };
};
