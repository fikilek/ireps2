import { useState } from 'react'
import './ErfsFilters.css'
import ErfsFiltersHeader from './ErfsFiltersHeader';
import ErfsFiltersBody from './ErfsFiltersBody';

const ErfsFilters = () => {
  const [filter, setFilter] = useState('data')
  return (
			<div className="erfs-filters">
				<ErfsFiltersHeader filter={filter} setFilter={setFilter} />
				<ErfsFiltersBody filter={filter} setFilter={setFilter} />
			</div>
		);
}

export default ErfsFilters