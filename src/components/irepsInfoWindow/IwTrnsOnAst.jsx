import { Timestamp } from "firebase/firestore";
import TableTrnsOnAst from "../tables/TableTrnsOnAst";
import TableDate from "../tables/TableDate";
import IrepsInfoWindow from "./IrepsInfoWindow";
import "./IwTrnsOnAst.css";
import { irepsConstants } from "../../utils/utils";
import useModal from "../../hooks/useModal";

const IwTrnsOnAst = props => {
	// console.log(`IwTrnsOnAst props`, props);

	const { trns, erf, id, astData } = props.data.data;
	// console.log(`trns`, trns);

	// retrieve astNo from astData
	const { astNo } = astData;

	// retrieve erfNo from erf
	const { erfNo } = erf;

	const { openModal } = useModal();

	const trnsOnAstTableFields = [
		{
			field: "trnType",
			headerName: "Trn Type",
			// width: 150,
			flex: 0.2,
		},
		{
			field: "updatedByUser",
			headerName: "Updated By",
			// width: 150,
			flex: 0.3,
		},
		{
			field: "updatedAtDatetime",
			headerName: "Updated At Datetime",
			cellRenderer: params => {
				// console.log(`params`, params);
				const newDate = params.value.toDate();
				return (
					<TableDate date={newDate} dateFormat={irepsConstants.IC_DATE_FORMAT1} />
				);
			},
			valueGetter: params => {
				// console.log(`params`, params);
				return params.data.updatedAtDatetime;
			},
			// width: 190,
			flex: 0.4,
		},
	];

	const handlePossibleTrns = e => {
		// console.log(`open Possible trns modal - e : `, e);
		openModal({
			modalName: "iwPossibleAstTrnsOnAst",
			payload: {
				erfNo,
				erfId: id,
				astNo,
			},
		});
	};

	return (
		<div className="iw-trns-on-ast">
			<IrepsInfoWindow
				hl1={"Trns On Ast"}
				hl2={<span>Ast: <span className="text-emphasis2">{astNo}</span></span>}

				hr2={<span>Erf: {<span className="text-emphasis2">{erfNo}</span>}</span>}
				// hr1={<button onClick={handlePossibleTrns}>Trn</button>}
				hr1={
					<span>Trns: {<span className="text-emphasis2">{trns?.length}</span>}</span>
				}
				windowWidth="35rem"
				windowHeight="35rem"
				headerType="headerType3"
			>
				<TableTrnsOnAst rowData={trns} colDefs={trnsOnAstTableFields} />
			</IrepsInfoWindow>
		</div>
	);
};

export default IwTrnsOnAst;
