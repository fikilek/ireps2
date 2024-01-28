import "../Form.css";
import { Formik, Form } from "formik";
import FormikControl from "../formik/FormikControl";
import Formheader from "../formHeader/Formheader";
import FormFooter from "../formFooter/FormFooter";
import { object, ref, string } from "yup";
import { CiLogin } from "react-icons/ci";
import FormMsg from "../formMsg/FormMsg";
import { formSelectOptions } from "../formUtils/utils";

console.log(`formSelectOptions`, formSelectOptions);

const linkTo = {
	icon: <CiLogin />,
	title: "Signin",
	linkName: "signin",
};

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const Signup = () => {
	// console.log(`Signup`);

	const initialValues = {
		surname: "",
		name: "",
		companyName: "",
		email: "",
		password: "",
		confirmPassword: "",
		cellNo: "",
		workbase: "",
	};

	const onSubmit = values => {
		console.log(`Form values`, values);

		// if (values.id) {
		// 	updateDocument(values);
		// } else {
		// 	addDocument(values);
		// }
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
		cellNo: string()
			.min(10, "At least 10 characters")
			.matches(phoneRegExp, "Phone number is not valid")
			.required("Cell number is required."),
		workbase: string().required("Workbase is required"),
	});

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
												control="input"
												type="text"
												label="Cell No"
												name={"cellNo"}
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
									<FormFooter formik={formik} linkTo={linkTo} currentForm="signup" />
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
