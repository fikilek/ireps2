import TableAstsOnErf from '../tables/TableAstsOnErf';
import IrepsInfoWindow from './IrepsInfoWindow';
import './IwAstsOnErf.css'

const IwAstsOnErf = (props) => {
  // console.log(`props`,props)
  const { asts } = props.data
  console.log(`asts`, asts);
  	const astsOnErfTableFields = [
		{
			field: "astData.astCartegory",
			headerName: "Ast Category",
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
  ]
  return (
			<div className="iw-asts-on-erf">
				<IrepsInfoWindow
					fhl1={"Asts On Erf"}
					fhl2={<span>Total Asts: {asts?.length}</span>}
				>
					<TableAstsOnErf rowData={asts} colDefs={astsOnErfTableFields} />
				</IrepsInfoWindow>
			</div>
		);
}

export default IwAstsOnErf