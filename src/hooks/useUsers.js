import { getFunctions, httpsCallable } from "firebase/functions";

import { useEffect, useState } from "react";
import TableUsersRoles from "../components/tables/TableUsersRoles";
import useCollection from "./useCollection";
import TableSelect from "../components/tables/TableSelect";
import useAuthContext from "./useAuthContext";
import TableDate from "../components/tables/TableDate";

export const useUsers = props => {
	const [users, setUsers] = useState([]);
	// console.log(`users`, users);

	const { user } = useAuthContext();

	const { data } = useCollection("users");
	// console.log(`users`, users);

	const functions = getFunctions();

	const listAllUsers = httpsCallable(functions, "listAllUsers");

	useEffect(() => {
		if (!user) return;
		listAllUsers().then(result => {
			// console.log(`result`, result);
			let newUsers = [];
			result?.data?.forEach(element => {
				// console.log(`element`, element);
				const fromFbCol = data.find(data => element.uid === data.id);
				if (fromFbCol) {
					// console.log(`fromFbCol`, fromFbCol);
					newUsers.push({
						...element,
						companyName: fromFbCol.companyName,
						workbase: fromFbCol.workbase,
						phoneNumber: fromFbCol.phoneNumber,
					});
				}
			});
			// console.log(`newUsers`, newUsers);
			setUsers(newUsers);
		});
	}, [data, user]);

	const usersTableFields = [
		{
			field: "uid",
			headerName: "users Id",
			width: 250,
			hide: true,
		},
		{
			field: "disabled",
			headerName: "Acc Status?",
			width: 150,
			// cellRenderer: TableUserAccDisableSelect,
			editable: true,
			cellEditor: TableSelect,
			cellEditorParams: {
				options: ["enabled", "disabled"],
			},
			valueGetter: params => {
				// console.log(`params.data.disabled`, params.data.disabled);
				return params.data.disabled ? "disabled" : "enabled";
			},
			valueSetter: params => {
				// console.log(`params.newValue`, params.newValue);
				params.data.disabled = params.newValue === "disabled" ? true : false;
				return true;
			},
			cellStyle: params => {
				// console.log(params);
				const { uid } = params.data;
				const selectDisabled = uid === user.uid ? true : false;
				return selectDisabled
					? {
							color: "grey",
							fontWeight: "700",
							pointerEvents: "none",
							cursor: "none",
							borderLeft: "0.3rem solid grey",
					  }
					: "";
			},
		},
		{
			field: "metadata.creationTime",
			headerName: "Date Created",
			width: 180,
			cellRenderer: params => {
				// console.log(`params`, params);
				const newDate = new Date(params.data.metadata?.creationTime);
				return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
			},
		},
		{
			field: "metadata.lastSignInTime",
			headerName: "Last Signin",
			width: 180,
			cellRenderer: params => {
				const newDate = new Date(params.data.metadata?.lastSignInTime);
				return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
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
			field: "customClaims.roles",
			headerName: "Roles",
			width: 220,
			cellRenderer: TableUsersRoles,
			valueGetter: params => {
				return params.value;
			},
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
	];

	return { usersTableFields, users };
};

// TODO: Add phpto url column to users tables
// TODO: Add online column to users table
