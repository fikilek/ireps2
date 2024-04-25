import TableSelect from "../components/tables/TableSelect";
import useAuthContext from "./useAuthContext";
import TableDate from "../components/tables/TableDate";
import { Timestamp } from "firebase/firestore";
import TableModalBtn from "../components/tables/TableModalBtn";
import { useEffect, useState } from "react";
import useCollection from "./useCollection";

export const useServiceProviders = () => {
	const { user } = useAuthContext();

	const [serviceProviders, setServiceProviders] = useState({});
	// console.log(`serviceProviders`, serviceProviders);

	const { data } = useCollection("serviceProviders");
	// console.log(`data`, data)

	useEffect(() => {
		const spOptions = [{ key: "choose", value: "choose" }];
		data &&
			data.forEach(sp => {
				spOptions.push({
					key: sp.registeredName,
					value: sp.registeredName,
					spId: sp.id,
				});
			});

		setServiceProviders({
			sps: data,
			spOptions,
		});
	}, [data]);

	const getSpDetails = spName => {
		return (
			serviceProviders.sps &&
			serviceProviders.sps.find(sp => sp.registeredName === spName)
		);
	};

	// Get sp details from given the sp name. Use reguar expresions to look for a matching name on the avaialbe list of service providers
	const getSpDetailsFromSpName = name => {
		return (
			serviceProviders.sps &&
			serviceProviders.sps.find(sp => {
				if (!(sp.registeredName && name)) return false;
				const spStr = sp.registeredName.toLowerCase().trim();
				// console.log(`spStr`, spStr);
				const nameStr = name.toLowerCase().trim();
				// console.log(`nameStr`, nameStr);
				// user regular expresions to search doe a matching nameStr in spStr
				const re = new RegExp(nameStr, "gi");
				return re.test(spStr);
			})
		);
	};

	const getSpClientsFromName = name => {
		// console.log(`name`, name)
		if (!name) return;
		const sp = getSpDetailsFromSpName(name);
		// console.log(`sp`, sp)
		if (!sp) return;
		return getSpClients(sp);
	};

	const getSpClients = sp => {
		const { clients } = sp || {};
		const clnts = [{ key: "choose", value: "choose" }];
		clients &&
			clients?.forEach(client => {
				clnts.push({ key: client.name, value: client.name });
			});
		return clnts;
	};

	const getSpFromId = id => {
		if (!id) return null;
		return serviceProviders.sps && serviceProviders.sps.find(sp => sp.id === id);
	};

	const getSpClientsFromId = id => {
		console.log(`id`, id);
		if (!id) return null;
		return serviceProviders.sps.filter(sp => sp.id.trim() === id.trim()).clients;
	};

	const newFormData = {
		disabled: false,
		metadata: {
			createdByUser: user?.displayName,
			createdByUid: user?.uid,
			createdAtDatetime: Timestamp?.now(),
		},
		contactPerson: {
			surnameAndName: "",
			cellNo: "",
		},
		registeredName: "",
		tradingName: "",
		mainOffice: {
			address: "",
			email: "",
			phone: "",
		},
		clients: [],
		otherOffices: [],
		stores: [],
		users: [],
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
					valueGetter: params => {
						// console.log(`params.data.disabled`, params.data.disabled);
						return params.data.metadata.createdAtDatetime;
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
					valueGetter: params => {
						// console.log(`params.data.disabled`, params.data.disabled);
						return params.data.metadata.updatedAtDatetime;
					},
				},
			],
		},
		{
			field: "registeredName",
			headerName: "Registered Name",
			width: 190,
			cellRenderer: props => {
				// console.log(`props`, props);
				return <TableModalBtn data={props}>{props.value}</TableModalBtn>;
			},
			cellRendererParams: {
				modalName: "serviceProvider",
			},
		},
		{
			field: "tradingName",
			headerName: "Trading Name",
			width: 150,
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
			field: "fieldworkers",
			headerName: "Fieldworkers",
			width: 140,
			cellRenderer: props => {
				// console.log(`props`, props);
				return (
					<TableModalBtn data={props}>{props.data?.users?.length}</TableModalBtn>
				);
			},
			cellRendererParams: {
				modalName: "serviceProviderData",
				infoName: "users",
			},
			valueGetter: params => {
				// console.log(`params.data.disabled`, params.data.disabled);
				return params;
			},
			valueSetter: params => {
				// console.log(`params.newValue`, params.newValue);
				return params;
			},
		},
		{
			field: "clients",
			headerName: "Clients",
			width: 140,
			cellRenderer: props => {
				return (
					<TableModalBtn data={props}>{props.data?.clients?.length}</TableModalBtn>
				);
			},
			cellRendererParams: {
				modalName: "serviceProviderData",
				infoName: "clients",
			},
			valueGetter: params => {
				// console.log(`params.data.disabled`, params.data.disabled);
				return params;
			},
			valueSetter: params => {
				// console.log(`params.newValue`, params.newValue);
				return params;
			},
		},
		{
			field: "otherOffices",
			headerName: "Other Offices",
			width: 140,
			cellRenderer: props => {
				return (
					// <TableModalBtn props={props}>{props.data.fws.length}</TableModalBtn>
					<TableModalBtn data={props}>
						{props.data?.otherOffices?.length}
					</TableModalBtn>
				);
			},
			cellRendererParams: {
				modalName: "serviceProviderData",
				infoName: "otherOffices",
			},
			valueGetter: params => {
				// console.log(`params.data.disabled`, params.data.disabled);
				return params;
			},
			valueSetter: params => {
				// console.log(`params.newValue`, params.newValue);
				return params;
			},
		},
		// {
		// 	field: "stores",
		// 	headerName: "Stores",
		// 	width: 150,
		// 	cellRenderer: TableSpStoresModalBtn,
		// 	cellRendererParams: {
		// 		modalName: "ServiceProviderStores",
		// infoName: 'stores',
		// 	},
		// },
	];

	return {
		tableFields,
		newFormData,
		serviceProviders,
		getSpDetails,
		getSpClients,
		getSpFromId,
		getSpClientsFromId,
		getSpDetailsFromSpName,
		getSpClientsFromName,
	};
};
