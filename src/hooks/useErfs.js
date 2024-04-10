import useCollection from "./useCollection";
import useAuthContext from "./useAuthContext";
import TableDate from "../components/tables/TableDate";
import TableModalBtn from "../components/tables/TableModalBtn.jsx";
import { Timestamp } from "firebase/firestore";
import { useFirestore } from "./useFirestore";
import cloneDeep from "lodash.clonedeep";
import { useEffect } from "react";

export const useErfs = () => {
	const { user } = useAuthContext();

	const { data: erfs } = useCollection("erfs");
	// console.log(`erfs`, erfs);

	const { response, addDocument } = useFirestore("erfs");

	// diplicate erf. When dupilcating an erf, strip the erf object of the following
	// 1. property type unti no
	// 2. all attached asts
	// TODO: check what else ot strip when  duplicting an erf

	const duplicateErf = erfData => {
		// console.log(`duplicating erfData`, formData);

		// clone the erf data
		const erf = cloneDeep(erfData);

		// remove id
		delete erf.id;
		// console.log(`clonedErf without id`, erf);

		// remove unit no
		const newErf = {
			...erf,
			propertyType: {
				...erf.propertyType,
				unitNo: "",
			},
		};
		// console.log(`newClonedErfData`, newClonedErfData);

		// add clonedErf to erfs
		addDocument(newErf);

		// TODO: use toast to confirm duplicated erf.

		// TODO: Handle error if duplication failed.
	};

	const erfsTableFields = [
		{
			field: "id",
			headerName: "System Id",
			width: 200,
			hide: true,
		},
		{
			headerName: "Created",
			children: [
				{
					field: "metadata.createdByUser",
					columnGroupShow: "open",
					headerName: "Created By",
					width: 130,
					hide: true,
				},
				{
					field: "metadata.createdAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 180,
					cellRenderer: params => {
						const timestamp = new Timestamp(
							params.value.seconds,
							params.value.nanoseconds
						);
						const newDate = timestamp.toDate();
						return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
					},
					hide: true,
				},
			],

			hide: true,
		},
		{
			headerName: "Updated",
			children: [
				{
					field: "metadata.updatedByUser",
					columnGroupShow: "open",
					headerName: "Updated By",
					width: 130,
					hide: true,
				},
				{
					field: "metadata.createdAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 180,
					cellRenderer: params => {
						const timestamp = new Timestamp(
							params.value.seconds,
							params.value.nanoseconds
						);
						const newDate = timestamp.toDate();
						return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
					},
					hide: true,
				},
			],

			hide: true,
		},
		// {
		// 	field: "edit",
		// 	headerName: "Edit",
		// 	width: 80,
		// 	// cellRenderer: memo(FormEditBtn),
		// 	cellRendererParams: {
		// 		fn: "erfsForm",
		// 		disabled: false,
		// 		hideHeader: false,
		// 		breakpoint: "xs",
		// 	},
		// 	floatingFilter: false,
		// },
		{
			field: "erfNo",
			headerName: "Erf No",
			width: 140,
			cellRenderer: props => {
				// console.log(`props`, props);
				return <TableModalBtn props={props}>{props.value}</TableModalBtn>;
			},
			cellRendererParams: {
				modalName: "erf",
			},
			hide: false,
			// checkboxSelection: true,
			// headerCheckboxSelection: true,
			// headerCheckboxSelectionFilteredOnly: true,
			// cellRenderer: memo(ErfBtn),
		},
		{
			field: "",
			// columnGroupShow: "closed",
			headerName: "GPS",
			width: 170,
			cellRenderer: props => {
				// console.log(`props`, props);
				return <TableModalBtn props={props}>{props.value}</TableModalBtn>;
			},
			cellRendererParams: {
				modalName: "erfOnMap",
				width: "7rem",
			},
			valueGetter: params => {
				// console.log(`params`, params);
				const lat = params.data.address.gps.latitude;
				const lng = params.data.address.gps.longitude;
				return `${Number(lat).toFixed(3)} | ${Number(lng).toFixed(3)}`;
			},
			hide: true,
		},
		{
			field: "asts.length",
			headerName: "Asts On Erf",
			width: 130,
			filterParams: {
				valueGetter: params => {
					return params.data.asts.length;
				},
			},
			tooltipField: "asts",
			cellRenderer: props => {
				// console.log(`props`, props);
				return <TableModalBtn props={props}>{props.value}</TableModalBtn>;
			},
			cellRendererParams: {
				modalName: "astsOnErf",
				width: "4rem",
			},
			hide: true,
			// tooltipComponent: TableTrnsForAstsTooltip,
		},
		{
			field: "",
			headerName: "Media",
			width: 100,
			cellRenderer: props => {
				// console.log(`props`, props);
				return <TableModalBtn props={props}>{props.value}</TableModalBtn>;
			},
			cellRendererParams: {
				modalName: "mediaMobile",
				width: "4rem",
				irepsKeyItem: "erfs",
			},
			valueGetter: params => {
				// console.log(`params`, params);
				return `${Math.floor(Math.random() * 4) + 1}`;
			},
		},

		{
			headerName: "Property Type",
			children: [
				{
					field: "propertyType.type",
					headerName: "Type",
					width: 150,
				},
				{
					field: "propertyType.unitName",
					headerName: "Unit Name",
					width: 130,
				},
				{
					field: "propertyType.unitNo",
					headerName: "Unit No",
					width: 100,
				},
			],
		},
		{
			field: "erfStatus",
			headerName: "Status",
			width: 150,
		},
		// {
		// 	field: "trns
		// 	headerName: "Erf Trns",
		// 	width: 150,
		// 	cellRenderer: props => {
		// 		// console.log(`props`, props);
		// 		return <TableModalBtn props={props}>{props.value}</TableModalBtn>;
		// 	},
		// 	cellRendererParams: {
		// 		modalName: "erfTrns",
		// 		width: "4rem",
		// 	},
		// 	// cellRenderer: params => params.data?.asts?.length,
		// 	// cellRenderer: memo(TableTrnsInErfBtn),
		// },

		{
			field: "address.systemAdr",
			headerName: "Street",
			width: 300,
		},
		{
			// A click displays a modal that shows the Purchase Order
			field: "standUse",
			headerName: "Stand Use", //[business, residentail-suburb, residential-township, church, government, school]
			width: 160,
		},
		{
			headerName: "Customer Address",
			children: [
				{
					field: "address.country",
					headerName: "Country",
					width: 120,
					columnGroupShow: "open",
				},
				{
					field: "address.province",
					headerName: "Province",
					width: 120,
					columnGroupShow: "open",
				},
				{
					field: "address.dm",
					headerName: "DM",
					width: 120,
					columnGroupShow: "open",
				},
				{
					field: "address.lmMetro",
					headerName: "LM or Metro",
					width: 120,
					columnGroupShow: "open",
				},
				{
					field: "address.town",
					headerName: "Towm",
					width: 120,
				},
				{
					field: "address.ward",
					headerName: "Ward",
					width: 120,
					columnGroupShow: "open",
				},
				{
					field: "address.suburbTownship",
					headerName: "Suburb/Township",
					width: 200,
					columnGroupShow: "open",
				},
				{
					field: "address.street",
					headerName: "Street",
					width: 170,
				},
			],
		},
		{
			headerName: "Customer Warm Body",
			children: [
				{
					field: "customer.warmBody.surname",
					// columnGroupShow: "closed",
					headerName: "Surname",
					width: 120,
				},
				{
					field: "customer.warmBody.name",
					// columnGroupShow: "closed",
					headerName: "Name",
					width: 120,
					cellRendererParams: {
						breakpoint: "xs",
					},
				},
				{
					field: "customer.warmBody.idNo",
					columnGroupShow: "open",
					headerName: "Id No",
					width: 120,
				},
				{
					field: "customer.warmBody.gender",
					columnGroupShow: "open",
					headerName: "Gender",
					width: 120,
				},
			],
		},
		{
			headerName: "Customer Juristic Person",
			children: [
				{
					field: "customer.juristicPerson.name",
					// columnGroupShow: "closed",
					headerName: "Name",
					width: 120,
				},
				{
					field: "customer.juristicPerson.tradingName",
					columnGroupShow: "open",
					headerName: "Trading Name",
					width: 120,
				},
				{
					field: "customer.juristicPerson.registeredName",
					columnGroupShow: "open",
					headerName: "Registered Name",
					width: 120,
				},
				{
					field: "customer.juristicPerson.registeredNo",
					columnGroupShow: "open",
					headerName: "Registered No",
					width: 120,
				},
			],
		},
		{
			headerName: "Customer Contact Person",
			children: [
				{
					field: "customer.contactPerson.surname",
					// columnGroupShow: "closed",
					headerName: "Surname",
					width: 120,
				},
				{
					field: "customer.contactPerson.name",
					// columnGroupShow: "closed",
					headerName: "Name",
					width: 120,
				},
				{
					field: "customer.contactPerson.landLine",
					columnGroupShow: "open",
					headerName: "Land Line",
					width: 120,
				},
				{
					field: "customer.contactPerson.emailAdr",
					columnGroupShow: "open",
					headerName: "Email Adr",
					width: 150,
				},
				{
					field: "customer.contactPerson.whatsApp",
					columnGroupShow: "open",
					headerName: "WhatssApp No",
					width: 120,
				},
				{
					field: "customer.contactPerson.cellNo",
					// columnGroupShow: "closed",
					headerName: "Cell No",
					width: 120,
				},
			],
		},
		{
			headerName: "Billing",
			children: [
				{
					field: "billing.accountNo.length",
					columnGroupShow: "open",
					headerName: "Account No",
					width: 150,
				},
				{
					field: "billing.indigent",
					columnGroupShow: "open",
					headerName: "Indigent",
					width: 120,
				},
				{
					field: "billing.tariff",
					columnGroupShow: "open",
					headerName: "Tariff",
					width: 120,
				},
			],
		},
	];
	// 	{
	// 		field: "uid",
	// 		headerName: "erfs Id",
	// 		width: 250,
	// 		hide: true,
	// 	},
	// 	{
	// 		field: "disabled",
	// 		headerName: "Acc Status?",
	// 		width: 150,
	// 		// cellRenderer: TableUserAccDisableSelect,
	// 		editable: true,
	// 		// cellEditor: TableSelect,
	// 		cellEditorParams: {
	// 			options: ["enabled", "disabled"],
	// 		},
	// 		valueGetter: params => {
	// 			// console.log(`params.data.disabled`, params.data.disabled);
	// 			return params.data.disabled ? "disabled" : "enabled";
	// 		},
	// 		valueSetter: params => {
	// 			// console.log(`params.newValue`, params.newValue);
	// 			params.data.disabled = params.newValue === "disabled" ? true : false;
	// 			return true;
	// 		},
	// 		cellStyle: params => {
	// 			// console.log(params);
	// 			const { uid } = params.data;
	// 			const selectDisabled = uid === user.uid ? true : false;
	// 			return selectDisabled
	// 				? {
	// 						color: "grey",
	// 						fontWeight: "700",
	// 						pointerEvents: "none",
	// 						cursor: "none",
	// 						borderLeft: "0.3rem solid grey",
	// 				  }
	// 				: "";
	// 		},
	// 	},
	// 	{
	// 		field: "metadata.creationTime",
	// 		headerName: "Date Created",
	// 		width: 180,
	// 		cellRenderer: params => {
	// 			// console.log(`params`, params);
	// 			const newDate = new Date(params.data.metadata?.creationTime);
	// 			return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
	// 		},
	// 	},
	// 	{
	// 		field: "metadata.lastSignInTime",
	// 		headerName: "Last Signin",
	// 		width: 180,
	// 		cellRenderer: params => {
	// 			const newDate = new Date(params.data.metadata?.lastSignInTime);
	// 			return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
	// 		},
	// 	},
	// 	{
	// 		field: "displayName",
	// 		headerName: "Display Name",
	// 		width: 170,
	// 	},
	// 	{
	// 		field: "email",
	// 		headerName: "Email Adr",
	// 		width: 200,
	// 	},
	// 	{
	// 		field: "emailVerified",
	// 		headerName: "Email Verified",
	// 		width: 150,
	// 		cellRenderer: params => {
	// 			// console.log(`params.data`, params.data);
	// 			return <p>{params.data.emailVerified ? "Yes" : "No"}</p>;
	// 		},
	// 	},
	// 	{
	// 		field: "customClaims.roles",
	// 		headerName: "Roles",
	// 		width: 220,
	// 		// cellRenderer: TableUsersRoles,
	// 		valueGetter: params => {
	// 			return params.value;
	// 		},
	// 	},
	// 	{
	// 		field: "phoneNumber",
	// 		headerName: "Phone Number",
	// 		width: 150,
	// 	},
	// 	{
	// 		field: "companyName",
	// 		headerName: "Company Name",
	// 		width: 170,
	// 	},
	// 	{
	// 		field: "workbase",
	// 		headerName: "Workbase",
	// 		width: 150,
	// 	},
	// ];

	return { duplicateErf, erfsTableFields, erfs };
};
