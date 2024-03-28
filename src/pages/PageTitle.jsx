import './PageTitle.css'

const PageTitle = (props) => {
  const {title} = props
  return (
    <div className='page-title'>{ title}</div>
  )
}

export default PageTitle