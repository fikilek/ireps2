import "../Form.css";
import { Formik, Form } from "formik";
import FormikControl from "../formik/FormikControl";
import Formheader from "../formHeader/Formheader";
import FormFooter from "../formFooter/FormFooter";
import { object, string } from "yup";
import FormMsg from "../formMsg/FormMsg";
import FormError from "../formError/FormError";
import { useSignup } from "../../../hooks/useSignup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useModal from "../../../hooks/useModal";
import useAuthContext from "../../../hooks/useAuthContext";

const EditUserEmail = props => {
	// console.log(`EditUserEmail`, props);

	const { user } = useAuthContext();

	const { closeModal } = useModal();

	const { formData: email } = props;

	const { updateUserEmail, error, isPending, success } = useSignup();

	const initialValues = {
		newEmail: email,
		email, //old email adr
		password: "",
	};

	const onSubmit = values => {
		console.log(`Form values`, values);
		updateUserEmail(values);
	};

	const validationSchema = object({
		newEmail: string()
			.email("Email is NOT valid.")
			.required("Email is required."),
		email: string().email("Email is NOT valid.").required("Email is required."),
		password: string().required("Password is required."),
	});

	useEffect(() => {
		if (success) {
			closeModal();
			toast.success(
				`User email for "${user.displayName}", succesfully updated on iREPS`,
				{
					position: "bottom-left",
				}
			);
		}
	}, [success, closeModal]);

	return (
		<div className="form-wrapper">
			<div className="form-container edit-user-email">
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{formik => {
						// console.log(`formik`, formik);
						return (
							<>
								<Form>
									<Formheader fhl1="Edit User Email" fhr1="" />
									<FormMsg msg="Enter the new email address on the 'New Email' field below and submit. If the new email is valid, open it from your inbox for validation and take action." />
									<div className="edit-email-form">
										<FormikControl
											control="input"
											type="email"
											label="Old Email"
											name={"email"}
											placeholder=""
											readOnly
										/>
										<FormikControl
											control="input"
											type="email"
											label="New Email"
											name={"newEmail"}
											placeholder=""
											autoFocus={true}
										/>
										<FormikControl
											control="inputPwd"
											type="password"
											label="Password"
											name={"password"}
											placeholder=""
											autoComplete="user password"
										/>
									</div>
									{error && <FormError errorMsg={error} />}
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

export default EditUserEmail;