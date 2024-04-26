import { Timestamp } from "firebase/firestore";
import useAuthContext from "./useAuthContext";
import { lazy, number, object, string } from "yup";
import { v4 as uuidv4 } from "uuid";
import TableDate from "../components/tables/TableDate";
import TableModalBtn from "../components/tables/TableModalBtn";
import useGetTrnsCollection from "./useGetTrnsCollection";
import { useContext, useEffect } from "react";
import { TrnsContext } from "../contexts/TrnsContext";
import useCollection from "./useCollection";
import { useDocument } from "./useDocument";
import ShowOnMap from "../components/irepsInfoWindow/ShowOnMap";

export const useTrnAudit = () => {
	const { user } = useAuthContext();

	const { trnsContext, setTrnsContext } = useContext(TrnsContext);
	// console.log(`trnsContext`, trnsContext);

	const { data, error, isPending, success } = useCollection("trns");
	// console.log(`data`, data);

	const {error: docFetchError, document, getDocument} = useDocument()

	useEffect(() => {
		setTrnsContext({
			...trnsContext,
			trns: data,
		});
	}, [data]);

	const newAuditTrnData = {
		meter: {
			audit: {
				access: {
					meterAccess: "yes", // ['yes', 'no']
					noAccessReason: "", //['', '', ''] - reuquired if access === 'no
				},
				metadata: {
					updatedAtDatetime: Timestamp.now(),
					updatedByUser: user.displayName,
					updatedByUid: user.uid,
					createdAtDatetime: Timestamp.now(),
					createdByUser: user.displayName,
					createdByUid: user.uid,
					trnHistory: 0, // how many times transaction has been updated
					trnType: "audit", //['installation', 'commissioning', 'vending', 'missing', 'found', 'disconnection', 'reconnection', 'sale', 'decomissioning', "dispose", 'inspection', 'audit']
					trnNo: "1234",
					trnId: uuidv4(),
					trnState: "draft",
				},
				astData: {
					astId: uuidv4(),
					astNo: '04 1233 34566', // for meters this is a meter no
					astCatergory: "meter", // [ 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
					astState: "service", // ['stores', 'field', 'service', 'etc']
					astManufacturer: "Conlog",
					astName: 'BEC44',
					meter: {
						phase: "single", // ['single', 'three', ]
						type: "pre-paid", // ['pre-paid', 'conventional']
						keypad: {
							isThereKeypad: "yes", // [ 'yes', 'no']
							keypadAccess: "yes", // [ 'yes', 'no'] - required if 'isThereKeypad' is 'yes'
							serialNo: "1q1q1q1q", // required if 'isThereKeypad' === 'yes' && 'keypadAccess' === 'yes'
							comment: "good condition", // required if 'keypadAccess' is 'no' (no access reason)
						},
						cb: {
							isThereCb: "yes", // [ 'yes', 'no']
							size: "80", // number (Amps) - required if 'isThereCb' === 'yes'
							comment: "good condition", // required if 'isThereCb' === 'yes' && 'cbSize' !== null
						},
						seal: {
							meterSealed: "yes", // [ 'yes', 'no']
							sealNo: "qaqaqaqaqaq", // text - required if 'isThereSeal' is yes
							comment: "good condition", // required if 'isThereSeal' === 'yes' && sealNo === null
						},
					},
				},
				media: {
					astNo: [], // [astNoPhoto', astNoAudio', astNoVideo'] -astNoPhoto required if 'astNo' !== null
					insideBox: [], // ['insideBoxPhoto', 'insideBoxAudio', 'insideBoxVideo'] - insideBoxPhoto required if 'astNo' !== null
					anomaly: [], // TODO : more detail needed
					keypad: [], // ['keypadPhoto', 'keypadAudio', 'keypadVideo'] - keypadPhoto required if 'isTherekeypad' === 'yes
					cb: [], // ['cbSizePhoto', 'cbSizeAudio', 'cbSizeVideo'] - cbSizePhoto required if 'isThereCb' === 'yes
					seal: [], // ['isThereSealPhoto', 'isThereSealAudio', 'isThereSealVideo'] - isThereSealPhoto required if 'isThereSeal' === 'yes
					noAccess: [],
				},
				location: {
					address: "", // ast exact or nearest address. 'gcBt'n used to collect data
					gps: {
						lat: "", // long - Required
						lng: "", // long - Required
					},
					premises: "inside", // ['inside', 'outside'] - Required
					insideBox: "yes", // ['yes', 'no'] - Required
				},
				anomalies: {
					anomaly: "meter ok", // ['', '', '', '', '', ''] - required
					anomalyDetail: "operationally ok", // ['', '', '', '', '', ''] - required based on 'anomaly'
				},
				erf: {
					erfNo: "",
					erfId: "",
					erfAdr: "",
				},
				serviceConnection: {
					configuration: "overhead",
				},
			},
			installation: {},
			tid: {},
			inspection: {},
		},
	};

	const auditTrnValidationSchema = {
		meter: {
			audit: object().shape({
				access: object().shape({
					meterAccess: string().required("Required"),
					noAccessReason: string().when("meterAccess", (meterAccess, schema) => {
						if (meterAccess[0] === "no") {
							return schema
								?.required("no access reason required")
								?.notOneOf(["choose", ""], "Required");
						} else {
							return schema;
						}
					}),
				}),
				astData: lazy((v, { context }) => {
					return object().shape({
						astNo: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							} else {
								return schema.required("Required");
							}
						}),
						astManufacturer: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							} else {
								return schema.required("Required");
							}
						}),
						astName: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							} else {
								return schema.required("Required");
							}
						}),
						meter: object().shape({
							phase: string().when("astNo", (astNo_, schema) => {
								const { astNo } = context.astData;
								const { meterAccess } = context.access;
								if (meterAccess === "no") {
									return schema.notRequired();
								}
								if (astNo === "" || astNo === null || astNo === undefined) {
									return schema?.notRequired();
								} else {
									return schema
										?.defined("Required")
										?.oneOf(["single", "three"], "Required");
								}
							}),
							type: string().when("astNo", (astno, schema) => {
								const { astNo } = context.astData;
								const { meterAccess } = context.access;
								if (meterAccess === "no") {
									return schema.notRequired();
								}
								if (astNo === "" || astNo === null || astNo === undefined) {
									return schema?.notRequired();
								} else {
									return schema
										?.defined("Required")
										?.oneOf(["pre-paid", "conventional"], "Required");
								}
							}),
							keypad: object().shape({
								keypadAccess: string().when("access", (meterAccess_, schema) => {
									const { meterAccess } = context.access;
									if (meterAccess === "no") {
										return schema.notRequired();
									}
									if (meterAccess === "yes") {
										return schema.oneOf(["yes", "no"], "yes or no?").required("Required");
									} else {
										return schema;
									}
								}),
								serialNo: string().when("keypadAccess", (keypadAccess_, schema) => {
									const { keypadAccess } = context.astData.meter.keypad;
									const { meterAccess } = context.access;
									if (meterAccess === "no") {
										return schema.notRequired();
									}
									if (keypadAccess === "yes") {
										return schema.required("Required");
									}
									if (keypadAccess === "no") {
										return schema.oneOf([""], "Must Be Blank");
									} else {
										return schema;
									}
								}),
								comment: string().when("keypadAccess", (keypadAccess_, schema) => {
									const { keypadAccess } = context?.astData?.meter?.keypad;
									const { meterAccess } = context.access;
									if (meterAccess === "no") {
										return schema.notRequired();
									}
									if (keypadAccess === "no") {
										return schema.required("Required").notOneOf(["choose"], "Required");
									} else {
										return schema;
									}
								}),
							}),
							cb: object().shape({
								isThereCb: string().when("meterAccess", (isThereCb_, schema) => {
									const { meterAccess } = context.access;
									if (meterAccess === "no") {
										return schema.notRequired();
									} else {
										schema.oneOf(["yes", "no"], "yes or no").required("Required");
									}
								}),
								size: number().when("isThereCb", (isThereCb_, schema) => {
									const { isThereCb } = context.astData.meter.cb;
									const { meterAccess } = context.access;
									if (meterAccess === "no") {
										return schema.notRequired();
									}
									if (isThereCb === "yes") {
										return schema.required("Required");
									}
									if (isThereCb === "no") {
										return schema.oneOf([""], "Must Be Blank");
									} else {
										return schema;
									}
								}),
								comment: string().when("isThereCb", (isThereCb_, schema) => {
									const { isThereCb } = context.astData.meter.cb;
									const { meterAccess } = context.access;
									if (meterAccess === "no") {
										return schema.notRequired();
									}
									if (isThereCb === "no") {
										return schema
											.required("Value Required")
											.notOneOf(["choose"], "Required")
											.defined("Required");
									} else {
										return schema;
									}
								}),
							}),
							seal: object().shape({
								meterSealed: string().when("meterAccess", (meterAccess_, schema) => {
									const { meterAccess } = context.access;
									if (meterAccess === "no") {
										return schema.notRequired();
									} else {
										return schema.oneOf(["yes", "no"], "yes or no").required("Required");
									}
								}),
								sealNo: string().when(
									["meterSealed", "comment"],
									([meterSealed, comment], schema) => {
										// console.log(`meterSealed`, meterSealed);
										// console.log(`comment`, comment);
										const { meterAccess } = context.access;
										if (meterAccess === "no") {
											return schema.notRequired();
										}
										if (
											comment === "seal no hard to read" ||
											comment === "seal has no seal no" ||
											meterSealed === "no"
										) {
											return schema.oneOf([""], "Must Be Blank");
										}
										if (meterSealed === "yes") {
											return schema.required("Required");
										} else {
											return schema;
										}
									}
								),
								comment: string().when("meterSealed", (meterSealed_, schema) => {
									const { meterSealed, sealNo } = context.astData.meter.seal;
									const { meterAccess } = context.access;
									if (meterAccess === "no") {
										return schema.notRequired();
									}
									if (meterSealed === "yes" && sealNo === "") {
										return schema
											.required("Required")
											.defined("Required")
											.notOneOf(["choose"], "Required");
									} else {
										return schema;
									}
								}),
							}),
						}),
					});
				}),
				location: lazy((v, { context }) => {
					return object().shape({
						// address: string().when("meterAccess", (meterAccess_, schema) => {
						// 	const { meterAccess } = context.access;

						// 	if (meterAccess === "yes") {
						// 		return schema.required("Required");
						// 	} else {
						// 		return schema.notRequired();
						// 	}
						// }),
						// gps: object().shape({
						// 	lat: number().when("meterAccess", (meterAccess_, schema) => {
						// 		const { meterAccess } = context.access;
						// 		if (meterAccess === "yes") {
						// 			return schema.required("Required");
						// 		} else {
						// 			return schema.notRequired();
						// 		}
						// 	}),
						// 	lng: number().when("meterAccess", (meterAccess_, schema) => {
						// 		const { meterAccess } = context.access;
						// 		if (meterAccess === "yes") {
						// 			return schema.required("Required");
						// 		} else {
						// 			return schema.notRequired();
						// 		}
						// 	}),
						// }),
						premises: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							}
							if (meterAccess === "yes") {
								return schema
									.required("Required")
									.oneOf(["inside", "outside"], "Required");
							} else {
								return schema.notRequired();
							}
						}),
						insideBox: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							}
							if (meterAccess === "yes") {
								return schema.required("Required").oneOf(["yes", "no"], "Required");
							} else {
								return schema.notRequired();
							}
						}),
					});
				}),
				anomalies: lazy((v, { context }) => {
					return object().shape({
						anomaly: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							}
							if (meterAccess === "yes") {
								return schema.required("Required").notOneOf(["choose"], "Required");
							} else {
								return schema;
							}
						}),
						anomalyDetail: string().when("anomaly", (meterAccess_, schema) => {
							const { anomaly } = context.anomalies;
							// console.log(`anomaly`, anomaly)
							// console.log(`meterAccess_`, meterAccess_);
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							}
							if (
								anomaly === "" ||
								anomaly === "choose" ||
								anomaly === null ||
								anomaly === undefined
							) {
								return schema.notRequired();
							} else {
								return schema.required("Required").notOneOf(["choose"], "Required");
							}
						}),
					});
				}),
				serviceConnection: lazy((v, { context }) => {
					return object().shape({
						configuration: string().when("meterAccess", (meterAccess_, schema) => {
							const { meterAccess } = context.access;
							if (meterAccess === "no") {
								return schema.notRequired();
							} else {
								return schema.required("Required");
							}
						}),
					});
				}),
				// metadata: lazy((v, { context }) => {
				// 	return object().shape({
				// 		// updatedAtDatetime: date().notRequired(),
				// 		updatedByUser: string().notRequired(),
				// 		updatedByUid: string().notRequired(),
				// 		// createdAtDatetime: date().notRequired(),
				// 		createdByUser: string().notRequired(),
				// 		createdByUid: string().notRequired(),
				// 		trnHistory: number().notRequired(), // how many times transaction has been updated
				// 		trnType: string().notRequired(), //['installation', 'commissioning', 'vending', 'missing', 'found', 'disconnection', 'reconnection', 'sale', 'decomissioning', "dispose", 'inspection', 'audit']
				// 		trnNo: string().notRequired(),
				// 		trnId: string().notRequired(),
				// 		trnState: string().notRequired(),
				// 	});
				// }),
			}),
		},
	};
		
	const trnsTableFields = [
		// trn id
		{
			field: "id",
			headerName: "System Id",
			width: 200,
			hide: true,
		},
		// trn created
		{
			headerName: "Created",
			children: [
				{
					field: "metadata.createdByUser",
					columnGroupShow: "closed",
					headerName: "Created By",
					width: 150,
					hide: false,
				},
				{
					field: "metadata.createdByUser",
					columnGroupShow: "open",
					headerName: "Created By",
					width: 150,
					hide: false,
				},
				{
					field: "metadata.createdAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 150,
					cellRenderer: params => {
						const timestamp = new Timestamp(
							params.value.seconds,
							params.value.nanoseconds
						);
						const newDate = timestamp.toDate();
						return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
					},
					valueGetter: params => {
						return params.data.metadata.createdAtDatetime;
					},
					hide: false,
				},
			],
		},
		// trn updated
		{
			headerName: "Updated",
			children: [
				{
					field: "metadata.updatedByUser",
					columnGroupShow: "closed",
					headerName: "Updated By",
					width: 150,
					hide: false,
				},
				{
					field: "metadata.updatedByUser",
					columnGroupShow: "open",
					headerName: "Updated By",
					width: 150,
					hide: false,
				},
				{
					field: "metadata.updatedAtDatetime",
					columnGroupShow: "open",
					headerName: "Date Created",
					width: 150,
					cellRenderer: params => {
						const timestamp = new Timestamp(
							params.value.seconds,
							params.value.nanoseconds
						);
						const newDate = timestamp.toDate();
						return <TableDate date={newDate} dateFormat={"yyyy-MMM-dd HH:mm"} />;
					},
					valueGetter: params => {
						return params.data.metadata.updatedAtDatetime;
					},
					hide: false,
				},
			],
		},
		// erf - data comes from the erf that created the trn
		{
			headerName: "Erf for Ast",
			children: [
				{
					field: "erf.erfNo",
					headerName: "Erf No",
					width: 110,
					cellRenderer: params => {
						// console.log(`props`, props);
						return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
					},
					cellRendererParams: {
						modalName: "iwShowOnMap",
					},
					hide: false,
				},
				{
					field: "erf.address",
					headerName: "Erf Address",
					width: 200,
					hide: false,
				},
				{
					field: "erf.erfId",
					headerName: "Erf Address",
					width: 150,
					hide: true,
				},
			],
		},
		// trn history
		// {
		// 	field: "metadata.trnHistory",
		// 	headerName: "History",
		// 	width: 100,
		// },
		// trn number
		// {
		// 	field: "metadata.trnNo",
		// 	headerName: "Trn No",
		// 	width: 100,
		// },
		// trn state
		{
			field: "metadata.trnState",
			headerName: "State",
			cellRenderer: params => {
				// console.log(`props.data`, params.data);
				return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
			},
			cellRendererParams: {
				modalName: "meter-audit",
				validationSchema: auditTrnValidationSchema["meter"]["audit"],
			},
			width: 100,
		},

		// trn media - all phots, voice clips and videos of the ast involved in the trn.
		// These are ast photos
		{
			field: "",
			headerName: "Media",
			width: 100,
			cellRenderer: params => {
				// console.log(`props`, props);
				return <TableModalBtn data={params}>{params.value}</TableModalBtn>;
			},
			cellRendererParams: {
				modalName: "mediaMobile",
				width: "4rem",
				irepsKeyItem: "erfs",
			},
			valueGetter: params => {
				// console.log(`params`, params);
				const media = params?.data?.media?.length ? params?.data?.media?.length : 0;
				return media;
			},
		},
		// Ast Description
		{
			headerName: "Ast Description",
			children: [
				// astCat
				{
					field: "astData.astCatergory",
					// columnGroupShow: "closed",
					headerName: "Ast Cat",
					width: 150,
					hide: false,
				},
				{
					field: "astData.astNo",
					// columnGroupShow: "open",
					headerName: "Ast No",
					width: 150,
					hide: false,
				},
				{
					field: "astData.astManufacturer",
					// columnGroupShow: "open",
					headerName: "Manufacturer",
					width: 150,
					hide: false,
				},
				{
					field: "astData.astName",
					// columnGroupShow: "open",
					headerName: "Ast Name",
					width: 150,
					hide: false,
				},
			],
		},
		// Ast Specific data
		{
			headerName: "Ast Specific",
			children: [
				// astCat
				{
					field: "astData.meter.type",
					// columnGroupShow: "closed",
					headerName: "Meter Type",
					width: 150,
					hide: false,
				},
				{
					field: "astData.meter.phase",
					// columnGroupShow: "open",
					headerName: "Meter Phase",
					width: 150,
					hide: false,
				},
			],
		},
		// Ast Anomalies
		{
			headerName: "Anomalies",
			children: [
				{
					field: "anomalies.anomaly",
					columnGroupShow: "open",
					headerName: "Anomaly",
					width: 150,
				},
				{
					field: "anomalies.anomalyDetail",
					columnGroupShow: "open",
					headerName: "Anomaly Detail",
					width: 300,
				},
			],
		},

		// Ast Location
		{
			headerName: "Location",
			children: [
				{
					field: "location.address",
					columnGroupShow: "closed",
					headerName: "Ast Address",
					width: 150,
				},
				{
					field: "location.gps",
					columnGroupShow: "closed",
					headerName: "Gps",
					valueGetter: params => {
						const lat = params.data.location.gps.lat;
						const lng = params.data.location.gps.lng;
						return `${lat}/${lng}`;
					},
					width: 120,
				},
				{
					field: "location.premises",
					columnGroupShow: "closed",
					headerName: "Premises",
					width: 120,
				},
				{
					field: "location.insideBox",
					columnGroupShow: "closed",
					headerName: "InsideBox",
					width: 120,
				},
			],
		},
	];

	return { newAuditTrnData, auditTrnValidationSchema, trnsTableFields };
};
