import { format } from 'date-fns';
import React from 'react'

const TableDate = (props) => {
  const {date, dateFormat} = props
  return (
			<div className="table-date">
				<p>{format(date, dateFormat)}</p>
			</div>
		);
}

export default TableDate