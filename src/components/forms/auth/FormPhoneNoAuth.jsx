import "../Form.css";
import { Formik, Form } from "formik";
import FormikControl from "../formik/FormikControl";
import Formheader from "../formHeader/Formheader";
import FormFooter from "../formFooter/FormFooter";
import { number, object, string } from "yup";
import FormMsg from "../formMsg/FormMsg";
import FormError from "../formError/FormError";
import { useSignup } from "../../../hooks/useSignup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useModal from "../../../hooks/useModal";
import useAuthContext from "../../../hooks/useAuthContext";

const PhoneNoAuth = props => {
	// console.log(`PhoneNoAuth`, props);

	const { user } = useAuthContext();

	const { closeModal } = useModal();

	const phoneNumber = props.formData;

	const { signupWithPhoneNumber, signupWithPhoneOtp, signupState } = useSignup();

	// Phone Number
	const initialValues = {
		newPhoneNumber: "+16505551122",
		phoneNumber: "+16505551122", //existing phone nuber
	};

	const validationSchema = object({
		newPhoneNumber: string().required("phone number is required."),
		phoneNumber: string().required("phone number is required."),
	});

	const onSubmit = values => {
		// console.log(`Form values`, values);
		signupWithPhoneNumber(values);
	};

	// Otp
	const initialValuesOtp = {
		otp: "",
	};

	const validationSchemaOtp = object({
		otp: number().required("otp is required."),
	});

	const onSubmitOtp = values => {
		console.log(`Form otp values`, values);
		signupWithPhoneOtp(values);
	};

	useEffect(() => {
		if (signupState.success) {
			closeModal();
			toast.success(
				`User email for "${user.displayName}", succesfully updated on iREPS`,
				{
					position: "bottom-left",
				}
			);
		}
	}, [signupState?.success, closeModal, user?.displayName]);

	return (
		<>
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
										<Formheader fhl1="Verifiy Cell No" fhr1="" />
										<div className="phone-no">
											<FormMsg
												msg={`Click SUBMIT to send a pin to the phone number. (Edit the phone number if necessary)`}
											/>
											<div className="edit-email-form">
												<FormikControl
													control="phoneNumberInput"
													type="hidden"
													label="Existing Phone Number"
													name={"phoneNumber"}
													placeholder=""
													hide={"hide"}
												/>
												<FormikControl
													control="phoneNumberInput"
													type="text"
													label="Phone Number"
													name={"newPhoneNumber"}
													placeholder=""
												/>
											</div>
											{signupState.error && <FormError errorMsg={signupState.error} />}
											<FormFooter formik={formik} isPending={signupState.isPending} />
										</div>
									</Form>
									<div id="recaptcha-container"></div>
								</>
							);
						}}
					</Formik>
				</div>
			</div>
			{signupState.otpSent && (
				<div className="form-wrapper">
					<div className="form-container edit-user-email">
						<Formik
							initialValues={initialValuesOtp}
							onSubmit={onSubmitOtp}
							validationSchema={validationSchemaOtp}
						>
							{formik => {
								// console.log(`formik`, formik);

								return (
									<>
										<Form>
											<div className="otp">
												<FormMsg msg="OTP sent succesfully. Enter the pin number on the OTP fields below and submit." />
												<div className="edit-email-form">
													<FormikControl
														control="input"
														type="text"
														label="One Time Pin"
														name={"otp"}
														placeholder=""
													/>
												</div>
												{signupState.error && <FormError errorMsg={signupState.error} />}
												<FormFooter formik={formik} signState={signupState.isPending} />
											</div>
										</Form>
									</>
								);
							}}
						</Formik>
					</div>
				</div>
			)}
		</>
	);
};

export default PhoneNoAuth;
