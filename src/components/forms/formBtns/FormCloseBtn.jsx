import "./FormBtn.css";
import useModal from "../../../hooks/useModal";

const FormCloseBtn = () => {
	const { closeModal } = useModal();
	return (
		// fbw - form button wrapper
		<div className="vc-hc form-close-btn">
			<button onClick={() => closeModal()} className="form-btn btn-close-form">
				X
			</button>
		</div>
	);
};

export default FormCloseBtn;
