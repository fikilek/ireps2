import { useServiceProviders } from '../../hooks/useServiceProviders'
import useModal from '../../hooks/useModal'
import './TableBtnAddServiceProvider.css'
import './Table.css'

const TableBtnAddServiceProvider = () => {
  const { openModal } = useModal()
  const {newFormData} = useServiceProviders()
  const newServiceProvider = e => {
    openModal({
      modalName: 'serviceProvider',
      payload: newFormData,
    })
  }
  return (
    <div className='table-btn-add-service-provider'>
      <button onClick={newServiceProvider}>Add Service Provider</button>
    </div>
  )
}

export default TableBtnAddServiceProvider