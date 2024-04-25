import React from "react";
import "./FormSection.css";
import FormShowHideSection from "./FormShowHideSection";
import { irepsDictionary } from "../../../utils/utils";

const FormSection = props => {
	const { active, setActive, children, sectionData } = props;
	// console.log(`setionData`, sectionData);
	const { sectionName, astCat, trnType, formik } = sectionData;
	// console.log(`sectionName`, sectionName);
	// console.log(`formik`, formik);

	// const { meterAccess } = formik?.values?.access;
	// console.log(`meterAccess`, meterAccess);

	let hideShow = null;
	// if (sectionName === "access") {
	// 	hideShow = "show";
	// } else {
	// 	if (sectionName === "erf") {
	// 		hideShow = "hide";
	// 	} else {
	// 		// hideShow = meterAccess === "no" ? "hide" : "show";
	// 	}
	// }

	return (
		// fs - form section
		// fsh - form section header
		// fsb - form section body
		// fs-uc - form section updated created
		<div className={`fs fs-${sectionName} ${hideShow} `}>
			<div className="fsh">
				<div className="open-colse-icons">
					<FormShowHideSection
						sectionName={sectionName}
						active={active}
						setActive={setActive}
					/>
					<div className="property-type">
						{/* {formik ? formik.values?.propertyType?.type : ""} */}
					</div>
					<p className="section-title">
						{/* {sectionName === "trn-data"
							? `${astCat} ${trnType} data`
							: irepsDictionary.get(sectionName)} */}
						{irepsDictionary.get(sectionName)}
					</p>
				</div>
				<div></div>
			</div>
			<div
				className={`fsb ${
					active === sectionName ? "show-section" : "hide-section"
				}`}
			>
				{children}
			</div>
		</div>
	);
};

export default FormSection;
