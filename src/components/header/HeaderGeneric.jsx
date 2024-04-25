import './HeaderGeneric.css'
import HeaderGeneric1 from './HeaderGeneric1'
import HeaderGeneric2 from './HeaderGeneric2'
import HeaderGeneric3 from './HeaderGeneric3'

const HeaderGeneric = (props) => {
  const {hl1, hl2, hl3, hr1, hr2, hr3} = props
  return (
    <div className='header-generic'>
      <HeaderGeneric1 hl1={hl1} hr1={hr1} />
      <HeaderGeneric2 hl1={hl1} hl2={hl2} hr1={hr1} hr2={hr2}    />
      <HeaderGeneric3 hl1={hl1} hl2={hl2} hl3={hl3} hr1={hr1} hr2={hr2} hr3={hr3}    />
    </div>
  )
}

export default HeaderGeneric