import "../Form.css";
import "./FormServiceProvider.css";

import { Formik, Form, FieldArray } from "formik";
import FormikControl from "../formik/FormikControl";
import Formheader from "../formHeader/Formheader";
import FormFooter from "../formFooter/FormFooter";
import { object, string } from "yup";
import FormError from "../formError/FormError";
import useModal from "../../../hooks/useModal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFirestore } from "../../../hooks/useFirestore";
import { useServiceProviders } from "../../../hooks/useServiceProviders";

const FormServiceProvider = props => {
	// console.log(`props`, props);

	const [selectedTab, setSelectedTab] = useState("main");

	const { serviceProviders, getSpDetails, getSpClients } = useServiceProviders();

	const { formData } = props;

	const { addDocument, updateDocument, response } =
		useFirestore("serviceProviders");
	// console.log(`response`, response);

	const { closeModal } = useModal();

	const onSubmit = values => {
		// console.log(`Form values`, values);
		const { id } = values;
		if (id) {
			updateDocument(values, id);
		} else {
			addDocument(values);
		}
	};

	const validationSchema = object({
		// disabled: string().required("required."),
		registeredName: string().required("required."),
		// mainOffice: object({
		// 	address: string().required("required"),
		// 	email: string().required("required"),
		// 	phone: string().required("required"),
		// }),
		// contactPerson: object({
		// 	surnameAndName: string().required("required"),
		// 	cellNo: string().required("required"),
		// }),
	});

	useEffect(() => {
		if (response.success) {
			closeModal();
			toast.success(`document succesfully added/updated`, {
				position: "bottom-left",
			});
		}
	}, [response.success, closeModal]);

	const selectTab = e => {
		setSelectedTab(e.target.id);
	};

	return (
		<div className="form-wrapper">
			<div className="form-container service-provider">
				<Formik
					initialValues={formData}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
					enableReinitialize
				>
					{formik => {
						// console.log(`formik`, formik);						const sp = getSpDetails(formik.values.companyName);
						const sp = getSpDetails(formik.values.companyName);
						let spClients = getSpClients(sp);
						
						const result = spClients?.find(
							client => client.key?.trim().toLowerCase() === "rste"
						);
						if (result) {
							const sp = getSpDetails("RSTE");
							spClients = getSpClients(sp);
						}

						return (
							<>
								<Form>
									<Formheader fhl1="Service Provider" fhr1="" />
									<div className="form-body">
										<div className="tabs">
											<div className="tabs-header">
												<div className="tabs-header-left">
													<button
														className={`tabs-btn ${selectedTab === "main" ? "active" : ""}`}
														id="main"
														onClick={selectTab}
														type={"button"}
													>
														Main
													</button>
													<button
														className={`tabs-btn ${
															selectedTab === "clients" ? "active" : ""
														}`}
														id="clients"
														onClick={selectTab}
														type={"button"}
													>
														Clients
													</button>
												</div>

												<div className="tabs-header-right">
													<button
														className={`tabs-btn ${
															selectedTab === "otherOffices" ? "active" : ""
														}`}
														id="otherOffices"
														onClick={selectTab}
														type={"button"}
													>
														Other Offices
													</button>
													<button
														className={`tabs-btn ${selectedTab === "stores" ? "active" : ""}`}
														id="stores"
														onClick={selectTab}
														type={"button"}
													>
														Stores
													</button>
												</div>
											</div>
											<div className="tabs-body">
												{selectedTab === "main" && (
													<div className="main body-display">
														<div className="form-row">
															<div className="row-50-50">
																{/* Company Name */}
																<FormikControl
																	control="input"
																	type="text"
																	label="Registered Name"
																	name={"registeredName"}
																	placeholder=""
																/>
																{/* Company Name */}
																<FormikControl
																	control="input"
																	type="text"
																	label="Trading Name"
																	name={"tradingName"}
																	placeholder=""
																/>
															</div>
															<div>
																{/* Company Address */}
																<FormikControl
																	control="input"
																	type="text"
																	label="Address"
																	name={"mainOffice.address"}
																	placeholder=""
																/>
															</div>
														</div>
														<div className="form-row">
															<div className="row-50-50">
																{/* Company Email address */}
																<FormikControl
																	control="input"
																	type="text"
																	label="Email Adr"
																	name={"mainOffice.email"}
																	placeholder=""
																	options={serviceProviders.spOptions}
																/>
																{/* Company Contact No */}
																<FormikControl
																	control="input"
																	type="text"
																	label="Office Contact No"
																	name={"mainOffice.phone"}
																	placeholder=""
																	options={spClients || "none"}
																/>
															</div>
															<div className="row-50-50">
																{/* Company Contact Person */}
																<FormikControl
																	control="input"
																	type="text"
																	label="Office Contact Person"
																	name={"contactPerson.surnameAndName"}
																	placeholder=""
																/>
																{/* Company Contact Person Cell No */}
																<FormikControl
																	control="input"
																	type="text"
																	label="Contact Person Cell"
																	name={"contactPerson.cellNo"}
																	placeholder=""
																/>
															</div>
														</div>

														<div className="form-row"></div>
													</div>
												)}
												{selectedTab === "clients" && (
													<div className="clients body-display">
														{/* Clients */}
														<FieldArray
															name="clients"
															render={arrayHelpers => {
																// console.log(`formData.clients.length`, formData.clients.length);
																return (
																	<>
																		<div className="body-display-header">
																			<button
																				className="row-add-btn"
																				type="button"
																				onClick={() =>
																					arrayHelpers.unshift({
																						name: "",
																						address: "",
																						email: "",
																						phone: "",
																					})
																				}
																			>
																				Add Client
																			</button>
																		</div>

																		{arrayHelpers.form.values.clients.map((client, index) => (
																			<div key={index} className="row-wrapper">
																				<div className="form-row">
																					<div className="row-10-45-45">
																						<button
																							className="row-remove-btn"
																							type="button"
																							onClick={() => arrayHelpers.remove(index)}
																						>
																							-
																						</button>
																						<FormikControl
																							control="reactSelect"
																							// type="text"
																							label="Name"
																							name={`clients.[${index}].name`}
																							placeholder=""
																						/>
																						<FormikControl
																							control="input"
																							type="text"
																							label="Address"
																							name={`clients.[${index}].address`}
																							placeholder=""
																						/>
																					</div>
																					<div className="row-50-50">
																						<FormikControl
																							control="input"
																							type="text"
																							label="Email"
																							name={`clients.[${index}].email`}
																							placeholder=""
																						/>
																						<FormikControl
																							control="input"
																							type="text"
																							label="Phone"
																							name={`clients.[${index}].phone`}
																							placeholder=""
																						/>{" "}
																					</div>{" "}
																				</div>
																			</div>
																		))}
																	</>
																);
															}}
														/>
													</div>
												)}

												{selectedTab === "otherOffices" && (
													<div className="other-offices body-display">
														{/* Other Offices */}
														<FieldArray
															name="otherOffices"
															render={arrayHelpers => {
																return (
																	<>
																		<div className="body-display-header">
																			<button
																				className="row-add-btn"
																				type="button"
																				onClick={() =>
																					arrayHelpers.unshift({
																						name: "",
																						address: "",
																						email: "",
																						phone: "",
																					})
																				}
																			>
																				Add Other Office
																			</button>
																		</div>

																		{arrayHelpers.form.values.otherOffices.map(
																			(client, index) => (
																				<div key={index} className="row-wrapper">
																					<div className="form-row">
																						<div className="row-10-45-45">
																							<button
																								className="row-remove-btn"
																								type="button"
																								onClick={() => arrayHelpers.remove(index)}
																							>
																								-
																							</button>
																							<FormikControl
																								control="input"
																								type="text"
																								label="Name"
																								name={`otherOffices.[${index}].name`}
																								placeholder=""
																							/>
																							<FormikControl
																								control="input"
																								type="text"
																								label="Address"
																								name={`otherOffices.[${index}].address`}
																								placeholder=""
																							/>
																						</div>
																						<div className="row-50-50">
																							<FormikControl
																								control="input"
																								type="text"
																								label="Email"
																								name={`otherOffices.[${index}].email`}
																								placeholder=""
																							/>

																							<FormikControl
																								control="input"
																								type="text"
																								label="Phone"
																								name={`otherOffices.[${index}].phone`}
																								placeholder=""
																							/>
																						</div>
																					</div>
																				</div>
																			)
																		)}
																	</>
																);
															}}
														/>
													</div>
												)}

												{selectedTab === "stores" && (
													<div className="stores body-display">
														{/* stores */}
														<FieldArray
															name="stores"
															render={arrayHelpers => {
																return (
																	<>
																		<div className="body-display-header">
																			<button
																				className="row-add-btn"
																				type="button"
																				onClick={() =>
																					arrayHelpers.unshift({
																						name: "",
																						address: "",
																						email: "",
																						phone: "",
																					})
																				}
																			>
																				Add stores
																			</button>
																		</div>

																		{arrayHelpers.form.values.stores.map((client, index) => (
																			<div key={index} className="row-wrapper">
																				<div className="form-row">
																					<div className="row-10-45-45">
																						<button
																							className="row-remove-btn"
																							type="button"
																							onClick={() => arrayHelpers.remove(index)}
																						>
																							-
																						</button>
																						<FormikControl
																							control="input"
																							type="text"
																							label="Name"
																							name={`stores.[${index}].name`}
																							placeholder=""
																						/>
																						<FormikControl
																							control="input"
																							type="text"
																							label="Address"
																							name={`stores.[${index}].address`}
																							placeholder=""
																						/>
																					</div>
																					<div className="row-50-50">
																						<FormikControl
																							control="input"
																							type="text"
																							label="Email"
																							name={`stores.[${index}].email`}
																							placeholder=""
																						/>

																						<FormikControl
																							control="input"
																							type="text"
																							label="Phone"
																							name={`stores.[${index}].phone`}
																							placeholder=""
																						/>
																					</div>
																				</div>
																			</div>
																		))}
																	</>
																);
															}}
														/>
													</div>
												)}
											</div>
										</div>
									</div>
									{response.error && <FormError errorMsg={response.error} />}
									<FormFooter formik={formik} signState={response}></FormFooter>
								</Form>
							</>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default FormServiceProvider;
