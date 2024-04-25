import { Timestamp } from "firebase/firestore";
import TableAstsOnErf from "../tables/TableAstsOnErf";
import TableDate from "../tables/TableDate";
import IrepsInfoWindow from "./IrepsInfoWindow";
import "./IwAstsOnErf.css";
import { irepsConstants } from "../../utils/utils";
import useModal from "../../hooks/useModal";

const IwAstsOnErf = props => {
	console.log(`IwAstsOnErf props`, props);

	const { asts, erfNo, id } = props.data.data;
	// console.log(`asts`, asts);

	const { openModal } = useModal();

	const astsOnErfTableFields = [
		{
			field: "astData.astCartegory",
			headerName: "Ast Category",
			width: 100,
		},
		{
			field: "trnmetadata.createdByUser",
			headerName: "Created By",
			width: 150,
		},
		{
			field: "trnmetadata.createdAtDatetime",
			headerName: "Created At Datetime",
			cellRenderer: params => {
				// console.log(`params`, params);
				const newDate = params.value.toDate();
				return (
					<TableDate date={newDate} dateFormat={irepsConstants.IC_DATE_FORMAT1} />
				);
			},
			valueGetter: params => {
				return params.data.trnmetadata.createdAtDatetime;
			},
			width: 150,
		},
		{
			field: "astData.astNo",
			headerName: "Ast Serial No",
			width: 150,
		},
		{
			field: "astData.astState",
			headerName: "Ast State",
			width: 150,
		},
		{
			field: "astData.cb.size",
			headerName: "Ast Size",
			width: 150,
			hide: false,
		},
		{
			field: "",
			headerName: "Ast Trns",
			cellRenderer: params => {
				return <button>Trns</button>;
			},
			width: 150,
			hide: false,
			headerTooltip: "Possible Transactions On The Ast",
			tooltipValueGetter: params => {
				return `Possible Transactions on the ${params.data.astData.astCartegory}`;
			},
		},
	];

	const handlePossibleTrns = e => {
		// console.log(`open Possible trns modal - e : `, e);
		openModal({
			modalName: "possibleAstTrnsOnErf",
			payload: {
				erfNo,
				erfId: id 
			}
		});
	};

	return (
		<div className="iw-asts-on-erf">
			<IrepsInfoWindow
				hl1={"Asts On Erf"}
				hl3={<span>Erf No: {erfNo}</span>}
				hr1={<button onClick={handlePossibleTrns}>Trn</button>}
				hr2={<span>Total Asts: {asts?.length}</span>}
				windowWidth='60rem'
				windowHeight="35rem"
				headerType="headerType3"
			>
				<TableAstsOnErf rowData={asts} colDefs={astsOnErfTableFields} />
			</IrepsInfoWindow>
		</div>
	);
};

export default IwAstsOnErf;
