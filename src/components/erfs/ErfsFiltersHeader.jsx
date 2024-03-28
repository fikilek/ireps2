import './ErfsFiltersHeader.css'

const ErfsFiltersHeader = (props) => {
  const {filter, setFilter} = props
  return (
    <div className='erfs-filters-header'>
      <button className={filter === 'data' ? ('active') : null } onClick={() => setFilter('data')}>Data Filters</button>
      <button className={filter === 'areas' ? ('active') : null } onClick={() => setFilter('areas')}>Area Filters</button>
    </div>
  )
}

export default ErfsFiltersHeader