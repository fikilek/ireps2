import { Suspense, useContext } from "react";
import "./Modal.css";

import { ModalContext } from "../../contexts/ModalContext";

import Signin from "../forms/auth/FormSignin";
import Signout from "../forms/auth/FormSignout";
import Signup from "../forms/auth/FormSignup";
import UpdateUser from "../forms/auth/FormUpdateUser";
import EditUserEmail from "../forms/auth/FormEditUserEmail";
import FormPasswordReset from "../forms/auth/FormPasswordReset";
import { loader } from "../../utils/utils";

const Modal = () => {
	const { toOpen, modalOpened } = useContext(ModalContext);
	// console.log(`modalOpened`, modalOpened);
	// console.log(`toOpen`, toOpen);

	const { modalName, payload } = toOpen;
	// console.log(`modalName`, modalName);
	// console.log(`payload`, payload);

	return (
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
				</div>
			</div>
		</div>
	);
};

export default Modal;
