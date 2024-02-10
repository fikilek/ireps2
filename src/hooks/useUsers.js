import { getFunctions, httpsCallable } from "firebase/functions";

import TableUserAccDisableSelect from "../components/tables/TableUserAccDisableSelect";
import { useEffect, useState } from "react";
import TableUsersRoles from "../components/tables/TableUsersRoles";
import { format } from "date-fns";

export const useUsers = props => {
	const [users, setUsers] = useState([]);
	const functions = getFunctions();

	const listAllUsers = httpsCallable(functions, "listAllUsers");

	useEffect(() => {
		listAllUsers().then(result => {
			setUsers(result.data);
		});
	}, []);

	const usersTableFields = [
		{
			field: "uid",
			headerName: "users Id",
			width: 280,
			hide: true,
		},
		{
			field: "disabled",
			headerName: "Acc Status",
			width: 150,
			cellRenderer: TableUserAccDisableSelect,
		},
		{
			field: "metadata.creationTime",
			headerName: "Date Created",
			width: 180,
			cellRenderer: params => {
				const newDate = new Date(params.data.metadata.creationTime);
				return <p>{format(newDate, "yyyy-MMM-dd HH:mm")}</p>;
			},
		},
		{
			field: "metadata.lastSignInTimee",
			headerName: "Last Signin",
			width: 180,
			cellRenderer: params => {
				const newDate = new Date(params.data.metadata.lastSignInTime);
				return <p>{format(newDate, "yyyy-MMM-dd HH:mm")}</p>;
			},
		},
		{
			field: "displayName",
			headerName: "Display Name",
			width: 170,
		},
		{
			field: "email",
			headerName: "Email Adr",
			width: 200,
		},
		{
			field: "emailVerified",
			headerName: "Email Verified",
			width: 150,
			cellRenderer: params => {
				// console.log(`params.data`, params.data);
				return <p>{params.data.emailVerified ? "Yes" : "No"}</p>;
			},
		},
		{
			field: "photoURL",
			headerName: "Photo",
			width: 100,
		},
		{
			field: "customClaims.roles",
			headerName: "Roles",
			width: 220,
			cellRenderer: TableUsersRoles,
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

	return { usersTableFields, users };
};
