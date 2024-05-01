import { useContext } from 'react';
import TableAsts from '../tables/TableAsts';
import './AstsTable.css'
import { AstsContext } from '../../contexts/AstsContext';
import { useAsts } from '../../hooks/useAsts';

const AstsTable = () => {
	const { astsTableFields } = useAsts();
	const { astsContext } = useContext(AstsContext);
	// console.log(`astsContext`, astsContext);
	return (
		<div className="asts-table">
			<TableAsts rowData={astsContext.asts} colDefs={astsTableFields} />
		</div>
	);
}

export default AstsTable;