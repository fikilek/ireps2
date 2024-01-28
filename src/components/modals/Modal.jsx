import { useContext } from "react";
import "./Modal.css";

import { ModalContext } from "../../contexts/ModalContext";

import Signin from "../forms/auth/FormSignin";
import Signout from "../forms/auth/FormSignout";
import Signup from "../forms/auth/FormSignup";
import FormFpw from "../forms/auth/FormFpw";

const Modal = () => {
	const { toOpen, modalOpened } = useContext(ModalContext);
	// console.log(`modalOpened`, modalOpened);
	// console.log(`toOpen`, toOpen);

	const { modalName } = toOpen;
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
					{modalName === "fpw" && <FormFpw />}
				</div>
			</div>
		</div>
	);
};

export default Modal;
