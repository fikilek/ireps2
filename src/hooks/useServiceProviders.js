import useCollection from "./useCollection";
import TableSelect from "../components/tables/TableSelect";
import useAuthContext from "./useAuthContext";
import TableDate from "../components/tables/TableDate";
import { Timestamp } from "firebase/firestore";
import TableModalBtn from "../components/tables/TableModalBtn";
import TableBtnsGroup from "../components/tables/TableBtnsGroup";

export const useServiceProviders = () => {
	const { user } = useAuthContext();

	const newFormData = {
		disabled: false,
		metadata: {
			createdByUser: "Fikile Kentane",
			createdByUid: user.uid,
			createdAtDatetime: Timestamp.now(),
		},
		name: "smars",
		mainOffice: {
			address: "Ormonde",
			email: "info@rset.co.za",
			phone: "011 123 1234",
		},
		clients: [
			{
				name: "Lesedi LM",
				address: "Heidelburg",
				email: "info@lesedi.gov.za",
				phone: "011 123 1234",
			},
			{
				name: "Victor Khanye LM",
				address: "Delmas",
				email: "info@vk.gov.za",
				phone: "011 123 1234",
			},
			{
				name: "Nkandla LM",
				address: "Nkandla",
				email: "info@nkandla.gov.za",
				phone: "011 123 1234",
			},
			{
				name: "eDumbe LM",
				address: "Pail Petersburg",
				email: "info@edumbe.gov.za",
				phone: "023 123 3456",
			},
		],
		otherOffices: [
			{
				name: "Heidelburg",
				address: "123 Str, Heidelburg",
				email: "heidelburg@rste.co.za",
				phone: "",
			},
			{
				name: "Nkandla",
				address: "123 Str, Nkandla",
				email: "heidelburg@rste.co.za",
				phone: "011 456 8754",
			},
		],
		stores: [
			{
				name: "Heidelburg",
				address: "123 Str",
				email: "storeshb@rste.co.za",
				phone: "-11 123 1234",
			},
			{
				name: "Paul Petersburg",
				address: "123 Str",
				email: "storespp@rste.co.za",
				phone: "-11 123 1234",
			},
		],
	};

	const tableFields = [
		{
			field: "uid",
			headerName: "serviceProviders Id",
			width: 250,
			hide: true,
		},
		{
			field: "disabled",
			headerName: "Acc Status",
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
			headerName: "Created",
			children: [
				{
					field: "metadata.createdByUser",
					headerName: "Created By User",
					width: 150,
				},
				{
					field: "metadata.createdByUid",
					headerName: "Created By Uid",
					width: 130,
					hide: true,
				},
				{
					field: "metadata.createdAtDatetime",
					headerName: "Date Created",
					width: 180,
					cellRenderer: params => {
						const newDate = new Date(params.data.metadata.createdAtDatetime.toDate());
						return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
					},
				},
			],
		},

		{
			headerName: "Updated",
			children: [
				{
					field: "metadata.updatedByUser",
					headerName: "Updated By User",
					width: 160,
				},
				{
					field: "metadata.updatedByUid",
					headerName: "Updated By Uid",
					width: 130,
					hide: true,
				},
				{
					field: "metadata.updatedAtDatetime",
					headerName: "Updated At Datetime",
					width: 190,
					cellRenderer: params => {
						const newDate = params.data.metadata.updatedAtDatetime.toDate();
						return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
					},
				},
			],
		},
		{
			field: "name",
			headerName: "Name",
			width: 150,
			cellRenderer: TableModalBtn,
			cellRendererParams: {
				modalName: "serviceProvider",
			},
		},
		{
			headerName: "Main Office",
			children: [
				{
					field: "mainOffice.address",
					headerName: "Address",
					width: 170,
				},
				{
					field: "mainOffice.email",
					headerName: "Email",
					width: 170,
				},
				{
					field: "mainOffice.phone",
					headerName: "Phone",
					width: 170,
				},
			],
		},
		{
			field: "clients",
			headerName: "Clients",
			width: 150,
			cellRenderer: TableBtnsGroup,
		},
		{
			field: "otherOffices",
			headerName: "Other Offices",
			width: 150,
			cellRenderer: TableBtnsGroup,
		},
		{
			field: "stores",
			headerName: "Stores",
			width: 150,
			cellRenderer: TableBtnsGroup,
		},
	];

	return { tableFields, newFormData };
};
