import "../Form.css";
import { Formik, Form } from "formik";
import FormikControl from "../formik/FormikControl";
import Formheader from "../formHeader/Formheader";
import FormFooter from "../formFooter/FormFooter";
import { object, ref, string } from "yup";
import { CiLogin } from "react-icons/ci";
import FormMsg from "../formMsg/FormMsg";
import { formSelectOptions } from "../formUtils/utils";
import { useSignup } from "../../../hooks/useSignup";
import FormError from "../formError/FormError";
import { useFirebase } from "../../../hooks/useFirebase";
import useModal from "../../../hooks/useModal";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAuthContext from "../../../hooks/useAuthContext";
import { capitalizeFirstLetters } from "../../../utils/utils";
import FormLinkBtn from "../formBtns/FormLinkBtn";

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const Signup = () => {
	// console.log(`Signup`);

	const { getCustomError } = useFirebase();

	const { signup, error, isPending, success } = useSignup();
	// console.log(`error`, error);
	// console.log(`isPending`, isPending);
	// console.log(`success`, success);

	const { closeModal } = useModal();

	const { user } = useAuthContext() || {};

	const initialValues = {
		surname: "kentane",
		name: "fikile",
		companyName: "rste",
		email: "fikilekentane@gmail.com",
		password: "fkpass123",
		confirmPassword: "fkpass123",
		phoneNumber: "+27817262352",
		workbase: "Lesedi LM",
	};

	const onSubmit = values => {
		// console.log(`Form values`, values);
		const newValues = capitalizeFirstLetters(values);
		signup(newValues);
	};

	const validationSchema = object({
		surname: string().required("Surname is required."),
		name: string().required("Name is required."),
		companyName: string().ensure().required("Company name is required."),
		email: string().email("Email is NOT valid.").required("Email is required."),
		password: string()
			.min(6, "At least 6 characters")
			.required("Password is required."),
		confirmPassword: string()
			.oneOf([ref("password"), null], "Passwords must match")
			.required("Confirn password is required."),
		phoneNumber: string()
			.min(10, "At least 10 characters")
			// .matches(phoneRegExp, "Phone number is not valid")
			.required("Cell number is required."),
		workbase: string().required("Workbase is required"),
	});

	useEffect(() => {
		if (success) {
			closeModal();
			toast.success(
				`User "${user?.displayName}" succesfully signedup with iREPS`,
				{
					position: "bottom-left",
				}
			);
		}
	}, [success, closeModal, user?.displayName]);

	return (
		<div className="form-wrapper">
			<div className="form-container signup">
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
									<Formheader fhl1="Singup/Register" fhr1="" />
									<FormMsg msg="Complete the fields below so as to gain access to iREPS." />
									<div className="signup-form">
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
										<div className="form-row">
											<FormikControl
												control="input"
												type="email"
												label="Email"
												name={"email"}
												placeholder=""
											/>
											<FormikControl
												control="phoneNumberInput"
												type="text"
												label="Phone No"
												name={"phoneNumber"}
												placeholder=""
											/>
										</div>
										<div className="form-row">
											<FormikControl
												control="inputPwd"
												type="password"
												label="Password"
												name={"password"}
												placeholder=""
												autoComplete="user password"
											/>

											<FormikControl
												control="inputPwd"
												type="password"
												label="Confirm Password"
												name={"confirmPassword"}
												placeholder=""
												autoComplete="Confirm password"
											/>
										</div>
									</div>
									{error && <FormError errorMsg={getCustomError(error)} />}
									<FormFooter formik={formik} isPending={isPending}>
										<FormLinkBtn icon={<CiLogin />} title="Signin" linkName="signin" />
									</FormFooter>
								</Form>
							</>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default Signup;
