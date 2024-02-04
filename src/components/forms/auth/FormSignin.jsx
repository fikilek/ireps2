import "../Form.css";
import { Formik, Form } from "formik";
import FormikControl from "../formik/FormikControl";
import Formheader from "../formHeader/Formheader";
import FormFooter from "../formFooter/FormFooter";
import { object, string } from "yup";
import { MdOutlinePassword } from "react-icons/md";
import FormMsg from "../formMsg/FormMsg";
import { useSignin } from "../../../hooks/useSignin";
import { useFirebase } from "../../../hooks/useFirebase";
import useModal from "../../../hooks/useModal";
import useAuthContext from "../../../hooks/useAuthContext";
import { useEffect } from "react";
import { toast } from "react-toastify";
import FormError from "../formError/FormError";
import { IoIosPersonAdd } from "react-icons/io";
import FormLinkBtn from "../formBtns/FormLinkBtn";

const linkTo = {
	icon: <MdOutlinePassword />,
	title: "Forgot Password",
	linkName: "fpw",
};

const Signin = () => {
	// console.log(`Signin`);

	const { getCustomError } = useFirebase();

	const { signin, error, isPending, success } = useSignin();
	console.log(`error`, error);
	console.log(`isPending`, isPending);
	console.log(`success`, success);

	const { closeModal } = useModal();

	const { user } = useAuthContext();
	console.log(`user`, user);

	const initialValues = {
		email: "",
		password: "",
	};

	const onSubmit = values => {
		console.log(`Form values`, values);
		signin(values);
	};

	const validationSchema = object({
		email: string().email("Email is NOT valid.").required("Email is required."),
		password: string().required("Password is required."),
	});

	useEffect(() => {
		if (success) {
			closeModal();
			toast.success(
				`User "${user?.displayName}" succesfully signedin with iREPS`,
				{
					position: "bottom-left",
				}
			);
		}
	}, [success, closeModal, user?.displayName]);

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
									{error && <FormError errorMsg={getCustomError(error)} />}

									<FormFooter formik={formik} isPending={isPending}>
										<FormLinkBtn
											icon={<IoIosPersonAdd />}
											title="Signun"
											linkName="signup"
										/>
										<FormLinkBtn
											icon={<MdOutlinePassword />}
											title="Forgot Password"
											linkName="fpw"
										/>
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

export default Signin;
