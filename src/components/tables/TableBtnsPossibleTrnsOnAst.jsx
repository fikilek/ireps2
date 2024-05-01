import useModal from "../../hooks/useModal";
import "./TableBtnsPossibleTrnsOnAst.css";
import TableModalBtn from "./TableModalBtn";

const TableBtnsPossibleTrnsOnAst = props => {
	// console.log(`props`, props);
  const { astData, metadata, trns } = props.data;
  
  const {openModal} = useModal()

	const handleTrnsOnAst = e => {
		openModal({
			modalName: 'iwTrnsOnAst',
			payload: { data:props.data, width: '4rem' },
		});
	};

	return (
		// possible-trns-on-ast -ptoa
		<div className="table-btns-possible-trns-on-ast">
			<button
				title="Transaction on ast"
				className="trns-on-ast-btn"
				onClick={handleTrnsOnAst}
			>
				{trns.length}
			</button>
			<button title="TID Rollover" className="ptoa-btn tid" id="tid">
				KRN1
			</button>
			<button
				title="Meter Inspection"
				className="ptoa-btn inspection"
				id="inspection"
			>
				Insp
			</button>
			<button
				title="Meter Disconnection"
				className="ptoa-btn disconnection"
				id="disconnection"
			>
				Dscn
			</button>
			<button
				title="Meter Reconnection"
				className="ptoa-btn reconnection"
				id="reconnection"
			>
				Recn
			</button>
		</div>
	);
};

export default TableBtnsPossibleTrnsOnAst;
