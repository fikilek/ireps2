import './TableModalBtn.css'
import useModal from '../../hooks/useModal'

const TableModalBtn = (props) => {
  // console.log(`props`, props)
  const { data, modalName } = props
  const {openModal} = useModal()
  const handleClick = e => {
    openModal({
      modalName: modalName,
      payload: data
    })
  }
  return (
			<div className="table-modal-btn">
				<button className="table-btn" onClick={handleClick}>
					{data?.name}
				</button>
			</div>
		);
}

export default TableModalBtn