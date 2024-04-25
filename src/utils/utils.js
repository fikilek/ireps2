//  functions

import {
	MdCamera,
	MdOutlineDeleteForever,
	MdOutlinePhotoCameraFront,
	MdOutlineSettingsVoice,
} from "react-icons/md";
import { TbCameraSelfie, TbSum } from "react-icons/tb";
import { ClockLoader } from "react-spinners";
import { AiOutlineAudio, AiOutlinePicture } from "react-icons/ai";
import { IoPlaySkipForwardOutline, IoVideocamOutline } from "react-icons/io5";
import {
	FaCamera,
	FaMapMarkedAlt,
	FaPlay,
	FaRegFileVideo,
} from "react-icons/fa";
import { BsStopCircle, BsTerminalSplit } from "react-icons/bs";
import { GiDoorHandle } from "react-icons/gi";
import { VscDiscard } from "react-icons/vsc";
import { IoIosRecording } from "react-icons/io";
import { BiSolidVideoRecording, BiVideoRecording } from "react-icons/bi";
import { FcPicture } from "react-icons/fc";
import { RiDraftLine } from "react-icons/ri";

export const capitalizeFirstLetter = string => {
	if (!string) return;
	return string.charAt(0).toUpperCase() + string.slice(1);
};

// capitalize first letter of surnamem, name and nickName
export const capitalizeFirstLetters = obj => {
	for (const property in obj) {
		if (
			property === "surname" ||
			property === "name" ||
			property === "nickName"
		) {
			const newStr = capitalizeFirstLetter(obj[property]);
			obj = {
				...obj,
				[property]: newStr,
			};
		}
	}
	return obj;
};

// constants
export const constants = {
	dateFormat1: "yyyy MMM dd: HH:mm",
	dateFormat2: "yyyy-MMM-dd_HH:mm:ss",
};

// loaders
export const loader = (
	<div
		style={{
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			width: "100%",
			height: "100%",
		}}
	>
		<ClockLoader
			color="blue"
			loading={true}
			size={150}
			aria-label="Loading Spinner"
			data-testid="loader"
			cssOverride={{
				margin: "auto",
			}}
		/>
	</div>
);

// auth
export const userRoles = [
	{ key: "guest", abreviation: "GST", name: "Guest" },
	{ key: "fieldworker", abreviation: "FWR", name: "Field Worker" },
	{ key: "supervisor", abreviation: "SPV", name: "Supervisor" },
	{ key: "manager", abreviation: "MNG", name: "Manager" },
	{ key: "superuser", abreviation: "SPU", name: "Super User" },
];

// erf
export const formSelectOptions = {
	propertyTypeOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Stand Alone", value: "Stand Alone" },
		{ key: "Flats", value: "Flats" },
		{ key: "Estate", value: "Estate" },
		{ key: "Complex", value: "Complex" },
		{ key: "Townhouses", value: "Townhouses" },
		{
			key: "Stand Alone (with outside rooms)",
			value: "Stand Alone (with outside rooms)",
		},
		{ key: "other", value: "other" },
	],
	sealCommentOptions: [
		{ key: "choose", value: "choose" },
		{ key: "seal has no seal no", value: "seal has no seal no" },
		{ key: "seal hard to read", value: "seal no hard to read" },
	],
	anomaliesOptions: [
		{ key: "choose", value: "choose" },
		{ key: "meterDamaged", value: "meterDamaged" },
		{ key: "meterFaulty", value: "meterFaulty" },
		{ key: "meterIllegalyConnected", value: "meterIllegalyConnected" },
		{ key: "meterOk", value: "meterOk" },
		{ key: "meterMissing", value: "meterMissing" },
	],
	tidRolloverStatusOptions: [
		{ key: "choose", value: "choose" },
		{ key: "1", value: "1" },
		{ key: "2", value: "2" },
		{ key: "3", value: "3" },
		{ key: "4", value: "4" },
	],
	tidRolloverKrnOptions: [
		{ key: "choose", value: "choose" },
		{ key: "1", value: "1" },
		{ key: "2", value: "2" },
	],

	rolloverDoneCommentOptions: [
		{ key: "choose", value: "choose" },
		{ key: "comment1", value: "comment1" },
		{ key: "comment2", value: "comment2" },
		{ key: "comment3", value: "comment3" },
		{ key: "comment4", value: "comment4" },
	],

	keyPadNoAccessOptions: [
		{ key: "choose", value: "choose" },
		{ key: "gate locked", value: "gate locked" },
		{ key: "property locked", value: "property locked" },
		{ key: "occupant refused access", value: "occupant refused access" },
		{ key: "dogs danger", value: "dogs danger" },
		{ key: "resident not available", value: "resident not available" },
	],

	erfStatusOptions: [
		{ key: "choose", value: "choose" },
		{ key: "developed", value: "developed" },
		{ key: "empty", value: "empty" },
		{ key: "vandalised", value: "vandalised" },
	],
	disconnectionLevelOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Level 1", value: "Level 1" },
		{ key: "Level 2", value: "Level 2" },
		{ key: "Level 3", value: "Level 3" },
	],

	countryOptions: [
		{ key: "choose", value: "choose" },
		{ key: "South Africa", value: "South Africa" },
		{ key: "China", value: "China" },
		{ key: "Russia", value: "Russia" },
	],

	provinceOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Eastern Cape", value: "Eastern Cape" },
		{ key: "Gauteng", value: "Gauteng" },
		{ key: "KZN", value: "KZN" },
		{ key: "Limpompo", value: "Limpompo" },
		{ key: "North West", value: "North West" },
		{ key: "Western Cape", value: "Western Cape" },
		{ key: " Cape", value: " Cape" },
	],

	dmOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Chris Hani", value: "Chris Hani" },
		{ key: "O R Tambo", value: "O R Tambo" },
		{ key: "Amathole", value: "Amathole" },
	],

	lmMetroOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Enock Mgijima", value: "Enock Mgijima" },
		{ key: "KSD", value: "KSD" },
		{ key: "eDumbe", value: "eDumbe" },
		{ key: "eMvoti", value: "eMvoti" },
		{ key: "Ekurhuleni", value: "Ekurhuleni Metro" },
		{ key: "CoJ Metro", value: "CoJ Metro" },
		{ key: "Tshwane Metro", value: "Tshwane Metro" },
		{ key: "Mnquma", value: "Mnquma" },
	],

	townOptions: [
		{ key: "choose", value: "choose" },
		{ key: "Gcuwa", value: "Gcuwa" },
		{ key: "Mthatha", value: "Mthatha" },
		{ key: "East London", value: "East London" },
		{ key: "Queenstown", value: "Queenstown" },
		{ key: "Tarkastad", value: "Tarkastad" },
		{ key: "Hofmeyer", value: "Hofmeyer" },
		{ key: "Paulpietersburg", value: "Paulpietersburg" },
		{ key: "", value: "" },
	],

	poletypeOptions: [
		{ key: "choose", value: "choose" },
		{ key: "wood", value: "wood" },
		{ key: "metal", value: "metal" },
		{ key: "pvc", value: "pvc" },
		{ key: "other", value: "other" },
	],

	goodBadOptions: [
		{ key: "choose", value: "choose" },
		{ key: "good", value: "good" },
		{ key: "bad", value: "bad" },
		{ key: "average", value: "average" },
	],

	cbPoleOtions: [
		{ key: "choose", value: "choose" },
		{ key: "single pole", value: "single pole" },
		{ key: "double pole", value: "double pole" },
	],

	trnConfirmationOptions: [
		// { key: "choose", value: "choose" },
		{ key: "done", value: "done" },
		{ key: "not done", value: "not done" },
	],

	serviceConnectionEntryOptions: [
		{ key: "choose", value: "choose" },
		{ key: "overhead", value: "overhead" },
		{ key: "underground", value: "underground" },
	],

	yesNoOptions: [
		{ key: "choose", value: "choose" },
		{ key: "yes", value: "yes" },
		{ key: "no", value: "no" },
	],

	astLocationPremisesOptions: [
		{ key: "choose", value: "choose" },
		{ key: "inside", value: "inside" },
		{ key: "outside", value: "outside" },
	],

	meterTypeOptions: [
		{ key: "choose", value: "choose" },
		{ key: "pre-paid", value: "pre-paid" },
		{ key: "conventional", value: "conventional" },
	],

	meterPhaseOptions: [
		{ key: "choose", value: "choose" },
		{ key: "single", value: "single" },
		{ key: "three", value: "three" },
	],

	astExactLocationOptions: [
		{ key: "choose", value: "choose" },
		{ key: "poleBottom", value: "poleBottom" },
		{ key: "poleTop", value: "poleTop" },
		{ key: "standAlone", value: "standAlone" },
		{ key: "building wall", value: "building wall" },
		{ key: "boundary wall", value: "boundary wall" },
		{ key: "other", value: "other" },
	],

	confirmInstallationDataOptions: [
		{ key: "choose", value: "choose" },
		{ key: "confirmed correct", value: "confirmed correct" },
		{ key: "data wrong", value: "data wrong" },
		{ key: "other", value: "other" },
	],

	genderOptions: [
		{ key: "choose", value: "choose" },
		{ key: "male", value: "male" },
		{ key: "female", value: "female" },
		{ key: "none", value: "none" },
	],

	customerCartegoryOptions: [
		{ key: "choose", value: "choose" },
		{ key: "owner", value: "owner" },
		{ key: "occupant", value: "occupant" },
	],

	customerTypeOptions: [
		{ key: "choose", value: "choose" },
		{ key: "warm body", value: "warm body" },
		{ key: "juristic person", value: "juristic person" },
	],

	standUseOptions: [
		{ key: "choose", value: "choose" },
		{ key: "residential suburb", value: "residential suburb" },
		{ key: "residential township", value: "residential township" },
		{ key: "business", value: "business" },
		{ key: "church", value: "church" },
		{ key: "government", value: "government" },
	],

	poleHasLampOptions: [
		{ key: "choose", value: "choose" },
		{ key: "yes", value: "yes" },
		{ key: "no", value: "no" },
	],

	poleTypeOptions: [
		{ key: "choose", value: "choose" },
		{ key: "wood", value: "wood" },
		{ key: "cement", value: "cement" },
		{ key: "metal", value: "metal" },
	],

	poleConditionOptions: [
		{ key: "choose", value: "choose" },
		{ key: "good", value: "good" },
		{ key: "leaning", value: "leaning" },
		{ key: "burned", value: "burned" },
		{ key: "bad", value: "bad" },
	],

	boxTypeOptions: [
		{ key: "choose", value: "choose" },
		{ key: "fibreglass", value: "fibreglass" },
		{ key: "metal", value: "metal" },
		{ key: "pvc", value: "pvc" },
	],

	boxLocationOptions: [
		{ key: "choose", value: "choose" },
		{ key: "pole top", value: "pole top" },
		{ key: "pole bottom", value: "pole bottom" },
		{ key: "stand alone", value: "stand alone" },
	],
	cbCommentsOptions: [
		{ key: "choose", value: "choose" },
		{ key: "cb missing", value: "cb missing" },
		{ key: "cb removed", value: "cb removed" },
	],
};

export const getAstCatMediaCat = namePath => {
	// namePath = namePath
	// 	.replaceAll("[", ".")
	// 	.replaceAll("]", ".")
	// 	.replaceAll("..", ".");
	const astCat = namePath
		.replaceAll("[", ".")
		.replaceAll("]", ".")
		.replaceAll("..", ".")
		.split(".");
	// .pop();

	const mediaCatStr = namePath
		.replaceAll("[", ".")
		.replaceAll("]", ".")
		.replaceAll("..", ".")
		.split(".")
		.pop();
	// console.log(`mediaCatStr`, mediaCatStr);
	const mediaCatName = mediaCatStr.substring(0, namePath.lastIndexOf("Media"));
	// console.log(`mediaCatName`, mediaCatName);

	const astCatMediaCat = `${astCat[1]} ${mediaCatName}`;
	// return mediaCatName;
	return { astCat: astCat[1], mediaCatName, astCatMediaCat };
};

export const irepsDictionary = new Map();
irepsDictionary.set("astNo", "Ast No");
irepsDictionary.set("astNoMedia", "No");
irepsDictionary.set("temperMedia", "Temper");
irepsDictionary.set("meterReadingMedia", "Reading");

irepsDictionary.set("sizeMedia", "Size");
irepsDictionary.set("insideBox", "Inside Box");
irepsDictionary.set("insideBoxMedia", "Inside Box");
irepsDictionary.set("keyPadMedia", "Key Pad");
irepsDictionary.set("keyPad", "Key Pad");
irepsDictionary.set("asts", "Assets");
irepsDictionary.set("trns", "Transactions");
irepsDictionary.set("admin", "Admin");
irepsDictionary.set("meter", "Meter");
irepsDictionary.set("seal", "Seal");
irepsDictionary.set("cb", "Cb");
irepsDictionary.set("users", "User");
irepsDictionary.set("systt", "System");
irepsDictionary.set("user-roles", "User Role");
irepsDictionary.set("tidKctTokens", "Tid Kct Token");

irepsDictionary.set("erfPhoto", "Erf Photo");
irepsDictionary.set("erfVideo", "Erf Video");
irepsDictionary.set("erfAudio", "Erf Audio");

irepsDictionary.set("voiceClips", "Voice Clips");
irepsDictionary.set("videoClips", "Video Clips");

irepsDictionary.set("meterDetail", "Meter Detail");
irepsDictionary.set("meterLocation", "Meter Location");
irepsDictionary.set("anomalies", "Anomalies");
irepsDictionary.set("keypad", "Keypad");
irepsDictionary.set("access", "Access");
irepsDictionary.set("meterDescription", "Meter Description");
irepsDictionary.set("serviceConnection", "Service Connection");

irepsDictionary.set("property-type", "Property Type");
irepsDictionary.set("customer-adr", "Customer Address");
irepsDictionary.set("customer", "Customer");
irepsDictionary.set("customer-contact-person", "Contact Person");
irepsDictionary.set("billing", "Billing");

export const irepsIcons = {
	ICON_TOTAL: <TbSum />,
	ICON_IMAGE1: <AiOutlinePicture />,
	ICON_IMAGE2: <FcPicture />,
	ICON_VOICE_CLIP: <MdOutlineSettingsVoice />,
	ICON_VIDEO_CLIP: <IoVideocamOutline />,
	ICON_DELETE: <MdOutlineDeleteForever />,
	ICON_MAP: <FaMapMarkedAlt />,
	ICON_SPLIT: <BsTerminalSplit />,
	ICON_PERMISSION: <GiDoorHandle />,
	ICON_START_RECORDING: <IoIosRecording />,
	ICON_STOP: <BsStopCircle />,
	ICON_DISCARD: <VscDiscard />,
	ICON_CAMERA_SELFIE: <TbCameraSelfie />,
	ICON_CAMERA_FRONT: <FaCamera />,
	ICON_CAMERA_FRONT2: <MdOutlinePhotoCameraFront />,
	ICON_START_VIDEO_RECORDING: <BiSolidVideoRecording />,
	ICON_VIDEO_RECORDING1: <BiSolidVideoRecording />,
	ICON_VIDEO_RECORDING2: <BiVideoRecording />,
	ICON_VIDEO_PLAYBACK1: <FaRegFileVideo />,
	ICON_CAMERA_SHOOT: <MdCamera />,
	ICON_AUDIO_PLAYBACK1: <AiOutlineAudio />,
	ICON_SAVE_DRAFT: <RiDraftLine />,
};

// IC - Ireps Contants
export const irepsConstants = {
	IC_DATE_FORMAT1: "yyyy-MMM-dd HH:mm",
	IC_DATE_FORMAT2: "yyyy-MMM-dd HH:mm:ss",
};

export const getAstCat = fieldNameStr => {
	// if (!gcData) return null;
	// let fieldNameStr = gcData?.data?.field?.name;
	if (!fieldNameStr) return null;
	// console.log(`fieldNameStr`, fieldNameStr);
	fieldNameStr = fieldNameStr?.replaceAll("[", ".");
	fieldNameStr = fieldNameStr?.replaceAll("]", ".");
	fieldNameStr = fieldNameStr?.replaceAll("..", ".");
	const fieldNameArray = fieldNameStr?.split(".");
	const astCategory = fieldNameArray[1];
	// console.log(`astCategory`, astCategory);
	return astCategory;
};
