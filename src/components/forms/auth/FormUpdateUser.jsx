import "../Form.css";
import { Formik, Form } from "formik";
import FormikControl from "../formik/FormikControl";
import Formheader from "../formHeader/Formheader";
import FormFooter from "../formFooter/FormFooter";
import { object, string } from "yup";
import FormMsg from "../formMsg/FormMsg";
import { formSelectOptions } from "../formUtils/utils";
import FormError from "../formError/FormError";
import { useFirebase } from "../../../hooks/useFirebase";
import useModal from "../../../hooks/useModal";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { capitalizeFirstLetters } from "../../../utils/utils";
import { useSignup } from "../../../hooks/useSignup";

const UpdateUser = props => {
	const { surname, name, companyName, workbase } = props.formData;

	const { getCustomError } = useFirebase();

	const { updateUser, error, isPending, success } = useSignup();

	const { closeModal } = useModal();

	const onSubmit = values => {
		// console.log(`Form values`, values);
		const newValues = capitalizeFirstLetters(values);
		updateUser(newValues);
	};

	const validationSchema = object({
		surname: string().required("Surname is required."),
		name: string().required("Name is required."),
		companyName: string().ensure().required("Company name is required."),
		workbase: string().required("Workbase is required"),
	});

	useEffect(() => {
		if (success) {
			closeModal();
			toast.success(`User "${surname} ${name}" succesfully updated on iREPS`, {
				position: "bottom-left",
			});
		}
	}, [success, closeModal, surname, name]);

	return (
		<div className="form-wrapper">
			<div className="form-container updateuser">
				<Formik
					initialValues={{
						surname,
						name,
						companyName,
						workbase,
					}}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{formik => {
						// console.log(`formik`, formik);
						return (
							<>
								<Form>
									<Formheader fhl1="Update User Info" fhr1="" />
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
											<FormikControl
												control="input"
												type="text"
												label="Name"
												name={"name"}
												placeholder=""
											/>
										</div>
										<div className="form-row">
											<FormikControl
												control="select"
												type="text"
												label="Company Name"
												name={"companyName"}
												placeholder=""
												options={formSelectOptions.companiesOptions}
											/>
											<FormikControl
												control="select"
												type="text"
												label="Workbase"
												name={"workbase"}
												placeholder=""
												options={formSelectOptions.workbaseOptions}
											/>
										</div>
									</div>
									{error && <FormError errorMsg={getCustomError(error)} />}
									<FormFooter formik={formik} isPending={isPending} />
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
