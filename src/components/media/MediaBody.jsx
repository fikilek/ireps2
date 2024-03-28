import { useContext } from 'react';
import './MediaBody.css'
import { MediaContext } from '../../contexts/MediaContext';
import MediaMainDisplay from './MediaMainDisplay';
import MediaOnMap from './MediaOnMap';

const MediaBody = () => {

  return (
    <div className='media-body'>
      <MediaMainDisplay />
      <MediaOnMap />
    </div>
  )
}

export default MediaBody