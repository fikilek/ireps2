import React from 'react'
import useCollection from '../../hooks/useCollection';
import TableServiceProviders from '../../components/tables/TableServiceProviders';
import { useServiceProviders } from '../../hooks/useServiceProviders';

const ServiceProviders = () => {
  const { data, error, isPending, success } = useCollection("serviceProviders");
  const { tableFields: columnDefs } = useServiceProviders()
  

  return (
			<div className="service-providers">
				<TableServiceProviders rowData={data} columnDefs={columnDefs} />
			</div>
		);
}

export default ServiceProviders