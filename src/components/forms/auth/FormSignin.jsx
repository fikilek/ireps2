import "../Form.css";
import { Formik, Form } from "formik";
import FormikControl from "../formik/FormikControl";
import Formheader from "../formHeader/Formheader";
import FormFooter from "../formFooter/FormFooter";
import { object, string } from "yup";
import { MdOutlinePassword } from "react-icons/md";
import FormMsg from "../formMsg/FormMsg";

const linkTo = {
	icon: <MdOutlinePassword />,
	title: "Forgot Password",
	linkName: "fpw",
};

const Signin = () => {
	// console.log(`Signin`);

	const initialValues = {
		email: "",
		password: "",
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
		email: string().email("Email is NOT valid.").required("Email is required."),
		password: string().required("Password is required."),
	});

	return (
		<div className="form-wrapper">
			<div className="form-container signin">
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
									<Formheader fhl1="Singin/Login" fhr1="" />
									<FormMsg msg="Type in the email and password to signin/logon to iREPS." />
									<div className="signin-form">
										<FormikControl
											control="input"
											type="email"
											label="Email"
											name={"email"}
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
									<FormFooter formik={formik} linkTo={linkTo} currentForm="signin" />
								</Form>
							</>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default Signin;
