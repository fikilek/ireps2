import "./TableModalBtn.css";
import useModal from "../../hooks/useModal";

const TableModalBtn = props => {
	// console.log(`props`, props);
	const { data, modalName, infoName } = props.props;
	// console.log(`data`, data)
	const { openModal } = useModal();
	const handleClick = e => {
		openModal({
			modalName: modalName,
			payload: infoName ? { ...data, infoName } : data,
		});
	};
	return (
		<div className="table-modal-btn">
			<button className="table-btn" onClick={handleClick}>
				{props.children}
			</button>
		</div>
	);
};

export default TableModalBtn;
