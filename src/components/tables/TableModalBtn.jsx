import "./TableModalBtn.css";
import useModal from "../../hooks/useModal";

const TableModalBtn = props => {
	// console.log(`props`, props);
	const { modalName, data, infoName, irepsKeyItem, width } = props.props;
	// console.log(`data`, data)
	const { openModal } = useModal();
	const handleClick = e => {
		openModal({
			modalName: modalName,
			payload: { ...data, infoName, irepsKeyItem, width },
		});
	};
	return (
		<div className="table-modal-btn">
			<button className="table-btn" onClick={handleClick} style={{width: width}}>
				{props.children}
			</button>
		</div>
	);
};

export default TableModalBtn;
