import { useContext } from 'react';
import './ErfsMain.css'
import { ErfsContext } from '../../contexts/ErfsContext';
import ErfsTable from './ErfsTable';
import ErfsSplit from './ErfsSplit';
import ErfsMap from './ErfsMap';

const ErfsMain = () => {
  const { ecs } = useContext(ErfsContext);

  return (
    <div className='erfs-main'>
      {ecs.activeTab === 'table' && <ErfsTable />}
      {ecs.activeTab === 'split' && <ErfsSplit />}
      {ecs.activeTab === 'map' && <ErfsMap />}
    </div>
  )
}

export default ErfsMain