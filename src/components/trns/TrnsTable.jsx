import { useContext } from 'react';
import TableTrns from '../tables/TableTrns';
import './TrnsTable.css'
import { TrnsContext } from '../../contexts/TrnsContext';
import { useTrnAudit } from '../../hooks/useTrnAudit';

const TrnsTable = () => {
	const { trnsTableFields } = useTrnAudit();
	const { trnsContext } = useContext(TrnsContext);
	// console.log(`trnsContext`, trnsContext);
	return (
		<div className="trns-table">
			<TableTrns rowData={trnsContext.trns} colDefs={trnsTableFields} />
		</div>
	);
}

export default TrnsTable;