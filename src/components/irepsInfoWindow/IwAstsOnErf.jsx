import { Timestamp } from "firebase/firestore";
import TableAstsOnErf from "../tables/TableAstsOnErf";
import TableDate from "../tables/TableDate";
import IrepsInfoWindow from "./IrepsInfoWindow";
import "./IwAstsOnErf.css";
import { irepsConstants } from "../../utils/utils";
import useModal from "../../hooks/useModal";
import TableModalBtn from "../tables/TableModalBtn";

const IwAstsOnErf = props => {
	console.log(`IwAstsOnErf props`, props);

	const { asts, erfNo, id, address } = props.data.data;
	// console.log(`asts`, asts);

	const { openModal } = useModal();

	const astsOnErfTableFields = [
		{
			field: "astCat",
			headerName: "Ast Category",
			width: 100,
		},
		{
			field: "createdByUser",
			headerName: "Created By",
			width: 150,
		},
		{
			field: "createdAtDatetime",
			headerName: "Created At Datetime",
			cellRenderer: params => {
				// console.log(`params`, params);
				const newDate = params.value.toDate();
				return (
					<TableDate date={newDate} dateFormat={irepsConstants.IC_DATE_FORMAT1} />
				);
			},
			valueGetter: params => {
				return params.data.createdAtDatetime;
			},
			width: 150,
		},
		{
			field: "astNo",
			headerName: "Ast No",
			width: 150,
		},
		{
			field: "astCreatorTrnName",
			headerName: "Created Through ",
			width: 150,
		},
		{
			field: "",
			headerName: "Ast Trns",
			cellRenderer: params => {
				console.log(`props`, props);
				return <TableModalBtn data={params}>Possible Trns</TableModalBtn>;
			},
			cellRendererParams: {
				modalName: "iwPossibleAstTrnsOnAst",
				width: "6rem",
			},
		},
	];

	const handlePossibleTrns = e => {
		// console.log(`open Possible trns modal - e : `, e);
		openModal({
			modalName: "possibleAstTrnsOnErf",
			payload: {
				erfNo,
				erfId: id ,
				address,
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
