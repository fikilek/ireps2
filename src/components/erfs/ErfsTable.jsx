import { useContext } from 'react';
import { useErfs } from '../../hooks/useErfs';
import TableErfs from '../tables/TableErfs';
import './ErfsTable.css'
import { ErfsContext } from '../../contexts/ErfsContext';

const ErfsTable = () => {
	const { erfsTableFields } = useErfs();
	const {erfsContext} = useContext(ErfsContext)
	// console.log(`erfs`, erfs);
  return (
			<div className="erfs-table">
				<TableErfs rowData={erfsContext.erfs} colDefs={erfsTableFields} />
			</div>
		);
}

export default ErfsTable;