import { useErfs } from '../../hooks/useErfs';
import TableErfs from '../tables/TableErfs';
import './ErfsTable.css'

const ErfsTable = () => {
	const { erfsTableFields, erfs } = useErfs();
	// console.log(`erfs`, erfs);
  return (
			<div className="erfs-table">
				<TableErfs rowData={erfs} colDefs={erfsTableFields} />
			</div>
		);
}

export default ErfsTable;