import { useContext } from "react";
import "./Modal.css";

import { ModalContext } from "../../contexts/ModalContext";

import Signin from "../forms/auth/FormSignin";
import Signout from "../forms/auth/FormSignout";
import Signup from "../forms/auth/FormSignup";
import UpdateUser from "../forms/auth/FormUpdateUser";
import EditUserEmail from "../forms/auth/FormEditUserEmail";
import FormPasswordReset from "../forms/auth/FormPasswordReset";

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
					{modalName === "signin" && <Signin />}
					{modalName === "signout" && <Signout />}
					{modalName === "signup" && <Signup />}
					{modalName === "passwordReset" && <FormPasswordReset />}
					{modalName === "updateUser" && <UpdateUser formData={payload} />}
					{modalName === "editUserEmail" && <EditUserEmail formData={payload} />}
				</div>
			</div>
		</div>
	);
};

export default Modal;
