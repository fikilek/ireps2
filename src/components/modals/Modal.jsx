import { Suspense, useContext } from "react";
import "./Modal.css";

import { ModalContext } from "../../contexts/ModalContext";

import Signin from "../forms/auth/FormSignin";
import Signout from "../forms/auth/FormSignout";
import Signup from "../forms/auth/FormSignup";
import UpdateUser from "../forms/auth/FormUpdateUser";
import EditUserEmail from "../forms/auth/FormEditUserEmail";
import FormPhoneNoAuth from "../forms/auth/FormPhoneNoAuth";
import FormPasswordReset from "../forms/auth/FormPasswordReset";
import { loader } from "../../utils/utils";
import FormUserRoleUpdate from "../forms/auth/FormUserRoleUpdate";
import { BrowserRouter } from "react-router-dom";
import PhoneNoAuth from "../forms/auth/FormPhoneNoAuth";
import FormServiceProvider from "../forms/formServiceProvider/FormServiceProvider";

const Modal = () => {
	const { toOpen, modalOpened } = useContext(ModalContext);
	// console.log(`modalOpened`, modalOpened);
	// console.log(`toOpen`, toOpen);

	const { modalName, payload } = toOpen;
	// console.log(`modalName`, modalName);
	// console.log(`payload`, payload);

	return (
		<BrowserRouter>
			<div className={`modal-container ${modalOpened ? "show" : "hide"}`}>
				<div className="modal-background" id="modal-background">
					<div className="modal-payload">
						{/* auth forms */}
						{modalName === "signin" && (
							<>
								<Suspense fallback={loader}>
									<Signin />
								</Suspense>
							</>
						)}
						{modalName === "signout" && (
							<>
								<Suspense fallback={loader}>
									<Signout />
								</Suspense>
							</>
						)}
						{modalName === "signup" && (
							<>
								<Suspense fallback={loader}>
									<Signup />
								</Suspense>
							</>
						)}

						{modalName === "passwordReset" && (
							<>
								<Suspense fallback={loader}>
									<FormPasswordReset />
								</Suspense>
							</>
						)}
						{modalName === "updateUser" && (
							<>
								<Suspense fallback={loader}>
									<UpdateUser formData={payload} />
								</Suspense>
							</>
						)}
						{modalName === "editUserEmail" && (
							<>
								<Suspense fallback={loader}>
									<EditUserEmail formData={payload} />
								</Suspense>
							</>
						)}
						{modalName === "editUserRoles" && (
							<>
								<Suspense fallback={loader}>
									<FormUserRoleUpdate formData={payload} />
								</Suspense>
							</>
						)}
						{modalName === "editUserPhoneNumber" && (
							<>
								<Suspense fallback={loader}>
									<FormPhoneNoAuth formData={payload} />
								</Suspense>
							</>
						)}
						{modalName === "serviceProvider" && (
							<>
								<Suspense fallback={loader}>
									<FormServiceProvider formData={payload} />
								</Suspense>
							</>
						)}
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default Modal;
