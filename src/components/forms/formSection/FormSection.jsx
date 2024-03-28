import React from "react";
import "./FormSection.css";
import FormShowHideSection from "./FormShowHideSection";

const FormSection = props => {
	const { active, setActive, children, sectionData } = props;
	// console.log(`setionData`, sectionData);
	const { sectionName, astCat, trnType, formik } = sectionData;
	// console.log(`formik`, formik);
	return (
		// fs - form section
		// fsh - form section header
		// fsb - form section body
		// fs-uc - form section updated created
		<div className={`fs fs-${sectionName} `}>
			<div className="fsh">
				<div className="open-colse-icons">
					<FormShowHideSection
						sectionName={sectionName}
						active={active}
						setActive={setActive}
					/>
					<div className="property-type">
						{formik ? formik.values?.propertyType?.type : ""}
					</div>
				</div>
				<div>
					<p>
						{sectionName === "trn-data" ? `${astCat} ${trnType} data` : sectionName}
					</p>
				</div>
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
