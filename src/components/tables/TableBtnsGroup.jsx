import './TableBtnsGroup.css'

const TableBtnsGroup = (props) => {
  console.log(`props`, props)
  // const { data } = props
  const {value} = props
  return (
    <div className='table-btns-group'>
      {
        value && value.map(item => {
          return (
            <button className='table-btn' key={item.name}>
              {item.name}
            </button>
          )
        })
      }
    </div>
  )
}

export default TableBtnsGroup