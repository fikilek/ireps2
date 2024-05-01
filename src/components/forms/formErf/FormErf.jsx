import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import "./FormErf.css";
import useModal from "../../../hooks/useModal";
import { useFirestore } from "../../../hooks/useFirestore";
import { toast } from "react-toastify";
import FormikControl from "../formik/FormikControl";
import FormSection from "../formSection/FormSection";
import { formSelectOptions } from "../../../utils/utils";
import { useCallback } from "react";
import FormFooter from "../formFooter/FormFooter";
import HeaderGeneric from "../../header/HeaderGeneric";
import MapReverseGeocodingApp from "../../maps/MapReverseGeocodingApp";

const FormErf = props => {
	// console.log(`FormErf props`, props);

	const { data: formData } = props.data;
	// console.log(`formData`, formData);

	const { closeModal, openModal } = useModal();

	const [active, setActive] = useState(null);

	// const { getTrnFormSection, getTrnValidationSchema } = useTrnForm(trn);

	const { response, updateDocument, addDocument } = useFirestore("erfs");
	// console.log(`response`, response)

	// const resp = useMemo(() => response, [response]);

	const onSubmit = useCallback(
		values => {
			console.log(`values`, values);

			if (values.id) {
				updateDocument(values, values.id);
			} else {
				addDocument(values);
			}
		},
		[addDocument, updateDocument]
	);

	useEffect(() => {
		// console.log(`response`, response);
		// TODO: An erf is always updated from the form and NOT created. A new erf creation is through dupliccation ONLY whnen its a sectional title.
		if (response.success) {
			closeModal();
			toast(`${formData.erfNo} ?  ${formData.erfNo} UPDATED succeesfully!`, {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	}, [response]);

	// const openIwAstsOnErf = (e, formik) => {
	// 	// console.log(`e`, e)
	// 	// console.log(`formmik`, formik)
	// 	// open infoWindow on modal and display table that shows all asts on erf
	// 	openModal({
	// 		modalName: "astsOnErf",
	// 		payload: formik.values,
	// 	});
	// };

	return (
		<div className="form-wrapper">
			<div className="form-container erf">
				<Formik
					initialValues={formData}
					onSubmit={onSubmit}
					// validationSchema={getTrnValidationSchema(
					// 	trn.astData.astCartegory,
					// 	trn.metaData.trnType
					// )}
				>
					{formik => {
						// const disabled = !(formik.isValid && formik.dirty);
						// console.log(`formik`, formik);
						// console.log(`formik.isValid`, formik.isValid);
						// console.log(`disabled`, disabled);
						// console.log(`formik.values`, formik.values);

						return (
							<Form>
								<div className="erf-form">
									<HeaderGeneric
										hl1={"Erf Form"}
										hl2={
											<div className="hl2">
												<span className="erf-no">
													Erf : <span className="text-emphasis2">{formData.erfNo}</span>
												</span>
											</div>
										}
										hr1={
											<>
												<span>
													Ward :{" "}
													<span className="text-emphasis2">
														{formData.address.ward ? formData.address.ward : "?"}
													</span>
												</span>
											</>
										}
										hr2={
											<div className="hl2">
												<span className="gps">
													{"("}
													<span className="text-emphasis2">
														{Number(formData.address.gps.latitude)?.toFixed(3)}
													</span>
													<span className="gps-seperator">{"|"}</span>
													<span className="text-emphasis2">
														{Number(formData.address.gps.longitude)?.toFixed(3)}
													</span>
													{") "}
												</span>
											</div>
										}
									/>
									{/* property-type */}
									<FormSection
										sectionData={{
											sectionName: "property-type",
											formik: formik,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="form-row">
												<div>
													<FormikControl
														control="select"
														type="text"
														label="property type"
														name="propertyType.type"
														options={formSelectOptions.propertyTypeOptions}
														placeholder=""
													/>
												</div>
												<div className="row-50-50">
													<FormikControl
														control="input"
														type="text"
														label="unit name"
														name="propertyType.unitName"
														placeholder=""
													/>
													<FormikControl
														control="input"
														type="text"
														label="unit no"
														name="propertyType.unitNo"
														placeholder=""
													/>
												</div>
											</div>
										</div>
									</FormSection>

									{/* customer-adr */}
									<FormSection
										sectionData={{
											sectionName: "customer-adr",
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="form-row">
												<div className="row-50-50">
													<FormikControl
														readOnly={true}
														control="input"
														type="text"
														label="erf no"
														name="erfNo"
														placeholder=""
													/>
													<FormikControl
														control="select"
														type="text"
														label="erf status"
														name="erfStatus"
														options={formSelectOptions.erfStatusOptions}
														placeholder=""
													/>
												</div>

												<div>
													{/* This is the user completed field if dont agre with google adr */}
													<FormikControl
														control="input"
														type="text"
														label="street address"
														name="address.street"
														placeholder=""
													/>
												</div>

												<div className="row-50-50">
													<FormikControl
														readOnly={true}
														control="input"
														type="text"
														label="suburd / tship"
														name="address.suburbTownship"
														placeholder=""
													/>
													<FormikControl
														readOnly={true}
														control="input"
														type="text"
														label="towm"
														name="address.town"
														placeholder=""
													/>
												</div>

												<div className="row-50-50">
													<FormikControl
														readOnly={true}
														control="input"
														type="text"
														label="ml / metro"
														name="address.lmMetro"
														placeholder=""
													/>
													<FormikControl
														readOnly={true}
														control="input"
														type="text"
														label="dm"
														name="address.dm"
														placeholder=""
													/>
												</div>

												<div className="row-50-50">
													<FormikControl
														readOnly={true}
														control="input"
														type="text"
														label="province"
														name="address.province"
														placeholder=""
													/>
													<FormikControl
														readOnly={true}
														control="input"
														type="text"
														label="country"
														name="address.country"
														placeholder=""
													/>
												</div>

												<div>
													<FormikControl
														control="rgcButton"
														type="button"
														label="erf system address"
														name={`address.systemAdr`}
														placeholder=""
													/>
												</div>
											</div>
										</div>
									</FormSection>

									{/* customer */}
									<FormSection
										sectionData={{
											sectionName: "customer",
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="form-row">
												<FormikControl
													control="select"
													type="text"
													label="custormer cartegory"
													name="customer.cartegory"
													options={formSelectOptions.customerCartegoryOptions}
												/>
												<FormikControl
													control="select"
													type="text"
													label="custormer type"
													name="customer.type"
													options={formSelectOptions.customerTypeOptions}
												/>
											</div>
											<div
												className={`form-row customer-type-warm-body ${
													formik?.values?.customer?.type === "warm body"
														? "show-section"
														: "hide-section"
												}`}
											>
												<div className="row-50-50">
													<FormikControl
														control="input"
														type="text"
														label="surname"
														name="customer.warmBody.surname"
														placeholder=""
													/>
													<FormikControl
														control="input"
														type="text"
														label="name"
														name="customer.warmBody.name"
														placeholder=""
													/>
												</div>
												<div className="row-50-50">
													<FormikControl
														control="input"
														type="text"
														label="id no"
														name="customer.warmBody.idNo"
														placeholder=""
													/>
													<FormikControl
														control="select"
														type="text"
														label="gender"
														name="customer.warmBody.gender"
														options={formSelectOptions.genderOptions}
														placeholder=""
													/>
												</div>
											</div>

											<div
												className={`form-row customer-type-juristic-person ${
													formik?.values?.customer?.type === "juristic person"
														? "show-section"
														: "hide-section"
												} `}
											>
												<div className="row-50-50">
													<FormikControl
														control="input"
														type="text"
														label="legal name"
														name="customer.juristicPerson.name"
														placeholder=""
													/>
													<FormikControl
														control="input"
														type="text"
														label="trading name"
														name="customer.juristicPerson.tradingName"
														placeholder=""
													/>
												</div>

												<div className="row-50-50">
													<FormikControl
														control="input"
														type="text"
														label="CIPC name"
														name="customer.juristicPerson.registeredName"
														placeholder=""
													/>
													<FormikControl
														control="input"
														type="text"
														label="CIPC no"
														name="customer.juristicPerson.registeredNo"
														placeholder=""
													/>
												</div>
											</div>
										</div>

										<div className="custormer-billing"></div>
									</FormSection>

									{/* contact-person */}
									<FormSection
										sectionData={{
											sectionName: "customer-contact-person",
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="form-row">
												<div className="row-50-50">
													<FormikControl
														control="input"
														type="text"
														label="surname"
														name="customer.contactPerson.surname"
														placeholder=""
													/>
													<FormikControl
														control="input"
														type="text"
														label="name"
														name="customer.contactPerson.name"
														placeholder=""
													/>
												</div>
												<div className="row-50-50">
													<FormikControl
														control="input"
														type="text"
														label="land line"
														name="customer.contactPerson.landLine"
														placeholder=""
													/>
													<FormikControl
														control="input"
														type="text"
														label="WhatsApp"
														name="customer.contactPerson.whatsApp"
														placeholder=""
													/>
												</div>
												<div className="row-50-50">
													<FormikControl
														control="input"
														type="text"
														label="cell no"
														name="customer.contactPerson.cellNo"
														placeholder=""
													/>
													<FormikControl
														control="input"
														type="text"
														label="email adr"
														name="customer.contactPerson.emailAdr"
														placeholder=""
													/>
												</div>
											</div>
										</div>
									</FormSection>

									{/* billig */}
									<FormSection
										sectionData={{
											sectionName: "billing",
										}}
										active={active}
										setActive={setActive}
									>
										<div className="form-row-wrapper">
											<div className="form-row">
												<div className="row-50-50">
													<FormikControl
														control="input"
														type="text"
														label="tariff"
														name="billing.tariff"
														placeholder=""
													/>
													<FormikControl
														control="select"
														type="text"
														label="indigent?"
														name="billing.indigent"
														options={formSelectOptions.yesNoOptions}
														placeholder=""
													/>
												</div>
												<div className="row-50-50">
													<FormikControl
														control="input"
														type="text"
														label="Accounts"
														name="billing.accountNo.length"
														placeholder=""
													/>
													<FormikControl
														control="select"
														type="text"
														label="stand use"
														name="standUse"
														options={formSelectOptions.standUseOptions}
														placeholder=""
													/>
												</div>
											</div>
										</div>
									</FormSection>

									<FormFooter formik={formik} signState={response} />
								</div>
							</Form>
						);
					}}
				</Formik>
				<MapReverseGeocodingApp geocoding="erf"/>
				{/* <PhotoAppErf /> */}
			</div>
		</div>
	);
};
export default FormErf;
