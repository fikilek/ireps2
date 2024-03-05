import './PageBody.css'

const PageBody = (props) => {
  return (
    <div className='page-body'>
      {props.children}
    </div>
  )
}

export default PageBody