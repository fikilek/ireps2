import "./FormBtn.css";
import useModal from "../../../hooks/useModal";

const FormLinkBtn = props => {
	// console.log(`props`, props);

	const { closeModal, openModal } = useModal();

	const { icon, title, linkName } = props;

	const handleClick = () => {
		closeModal();
		openModal({
			modalName: linkName,
		});
	};

	return (
		<div className="form-link-btn">
			<button
				title={title}
				onClick={handleClick}
				className="form-btn btn-redirect"
			>
				{icon}
			</button>
		</div>
	);
};

export default FormLinkBtn;
