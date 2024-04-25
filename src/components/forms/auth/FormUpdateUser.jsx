import "../Form.css";
import { Formik, Form } from "formik";
import FormikControl from "../formik/FormikControl";
import FormFooter from "../formFooter/FormFooter";
import { object, string } from "yup";
import FormMsg from "../formMsg/FormMsg";
import FormError from "../formError/FormError";
import { useFirebase } from "../../../hooks/useFirebase";
import useModal from "../../../hooks/useModal";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { capitalizeFirstLetters } from "../../../utils/utils";
import { useSignup } from "../../../hooks/useSignup";
import { useServiceProviders } from "../../../hooks/useServiceProviders";
import HeaderGeneric2 from "../../header/HeaderGeneric2";

const UpdateUser = props => {
	// console.log(`props`, props)
	const { surname, name, nickName, companyName, workbase } = props.formData;

	const {
		serviceProviders,
		getSpClients,
		getSpDetailsFromSpName,
		getSpClientsFromName,
	} = useServiceProviders();


	const { getCustomError } = useFirebase();

	const { updateUser, signupState } = useSignup();

	const { closeModal } = useModal();

	const onSubmit = values => {
		// console.log(`Form values`, values);
		const newValues = capitalizeFirstLetters(values);
		// console.log(`Form newValues`, newValues);
		updateUser(newValues);
	};

	const validationSchema = object({
		surname: string().required("Surname is required."),
		name: string().required("required."),
		nickName: string().required("required."),
		companyName: string().ensure().required("Company name is required."),
		workbase: string().required("Workbase is required"),
	});

	useEffect(() => {
		if (signupState.success) {
			closeModal();
			toast.success(`User "${surname} ${name}" succesfully updated on iREPS`, {
				position: "bottom-left",
			});
		}
	}, [signupState.success, closeModal, surname, name]);

	return (
		<div className="form-wrapper">
			<div className="form-container update-user">
				<Formik
					initialValues={{
						surname,
						name,
						nickName,
						companyName,
						workbase,
					}}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{formik => {
						// console.log(`formik`, formik);

						// This will use regular ecpresion to search for matching companyName form list of all service providers
						const sp = getSpDetailsFromSpName(formik.values.companyName);
						// console.log(`sp`, sp);

						let spClients = getSpClients(sp);

						const result = spClients.find(client => {
							const clientStr = client.key.toLowerCase().trim();
							// console.log(`clientStr`, clientStr);

							// user regular expresions to search doe a matching nameStr in spStr
							const re = new RegExp("rste", "gi");
							// console.log(`re`, re);

							return re.test(clientStr);
						});
						// console.log(`result`, result);

						if (result) {
							// const sp = getSpDetails("rste");
							spClients = getSpClientsFromName("rste");
						}
						// console.log(`spClients`, spClients);

						return (
							<>
								<Form>
									<HeaderGeneric2 fhl1="Update User Info" />
									<FormMsg msg="Complete the fields below and submit to update user info on iREPS." />
									<div className="updateuser-form">
										<div className="form-row">
											<FormikControl
												control="input"
												type="text"
												label="Surname"
												name={"surname"}
												placeholder=""
												autoFocus={true}
											/>
											<div className="row-50-50">
												<FormikControl
													control="input"
													type="text"
													label="Name"
													name={"name"}
													placeholder=""
												/>
												<FormikControl
													control="input"
													type="text"
													label="Aka"
													name={"nickName"}
													placeholder=""
												/>
											</div>
										</div>
										<div className="form-row">
											<FormikControl
												control="select"
												type="text"
												label="Company Name"
												name={"companyName"}
												placeholder=""
												options={serviceProviders.spOptions}
											/>
											<FormikControl
												control="select"
												type="text"
												label="Workbase"
												name={"workbase"}
												placeholder=""
												options={spClients}
											/>
										</div>
									</div>
									{signupState.error && (
										<FormError errorMsg={getCustomError(signupState.error)} />
									)}
									<FormFooter formik={formik} signState={signupState} />
								</Form>
							</>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default UpdateUser;
