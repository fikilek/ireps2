import React from 'react'

const TableHeader = (props) => {
  const {thLl, thLr, thRl, thRr} = props
  return (
    <div className='table-header'>
      <div className="thL">
        <div className="thLl">{thLl }</div>
        <div className="thLr">{ thLr}</div>
      </div>
      <div className="thRl">{ thRl}</div>
      <div className="thRr">{thRr}</div>
      
    </div>
  )
}

export default TableHeader