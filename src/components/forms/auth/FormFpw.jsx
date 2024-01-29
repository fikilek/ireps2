import "../Form.css";
import { Formik, Form } from "formik";
import FormikControl from "../formik/FormikControl";
import Formheader from "../formHeader/Formheader";
import FormFooter from "../formFooter/FormFooter";
import { object, string } from "yup";
import { CiLogin } from "react-icons/ci";
import FormMsg from "../formMsg/FormMsg";
import FormError from "../formError/FormError";

const linkTo = {
	icon: <CiLogin />,
	title: "Signin/Logon",
	linkName: "signin",
};

const FormFpw = () => {
	// console.log(`FormFpw`);

	const initialValues = {
		email: "",
	};

	const authError = "Data not know";

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
	});

	return (
		<div className="form-wrapper">
			<div className="form-container fpw">
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
									<Formheader fhl1="Forgot Password" fhr1="" />
									<FormMsg msg="A password RESET email will be sent to the inbox that signup/registered with iREPS." />
									<div className="forgot-password-form">
										<FormikControl
											control="input"
											type="email"
											label="Email"
											name={"email"}
											placeholder=""
											autoFocus={true}
										/>
									</div>
									{/* {error && <FormError errorMsg={error} />} */}
									<FormFooter formik={formik} linkTo={linkTo} currentForm="fpw" />
								</Form>
							</>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default FormFpw;
