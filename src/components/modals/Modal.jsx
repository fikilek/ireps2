import React, { useContext } from "react";
import "./Modal.css";

import { ModalContext } from "../../contexts/ModalContext";

import Signin from "../../components/forms/authForms/Signin";
import Signout from "../../components/forms/authForms/Signout";
import Signup from "../../components/forms/authForms/Signup";
import ForgottenPassword from "../../components/forms/authForms/ForgottenPassword";

const Modal = () => {
	const { toOpen, modalOpened } = useContext(ModalContext);
	// console.log(`modalOpened`, modalOpened);
	// console.log(`toOpen`, toOpen);

	const { modalName } = toOpen;
	// console.log(`modalName`, modalName)
	// console.log(`payload`, payload);

	return (
		<div className={`modal ${modalOpened ? "show" : "hide"}`}>
			<div className="modal-background" id="modal-background">
				<div className="modal-payload">
					<div className="modal-body">
						{/* auth forms */}
						{modalName === "signin" && <Signin />}
						{modalName === "signout" && <Signout />}
						{modalName === "signup" && <Signup />}
						{modalName === "fpw" && <ForgottenPassword />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
