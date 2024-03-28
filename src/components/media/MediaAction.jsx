import { useContext } from 'react'
import './MediaAction.css'
import { MediaContext } from '../../contexts/MediaContext'
import MediaActionCamera from './MediaActionCamera'
import MediaActionVoice from './MediaActionVoice'
import MediaActionVideo from './MediaActionVideo'
import MediaActionGallery from './MediaActionGallery'

const MediaAction = (props) => {
	// console.log(`props`, props)
  const { mediaData } = useContext(MediaContext)
  
  return (
			<div
				className={`media-action ${
					mediaData.activeMediaAction ? "showMediaAction" : "hideMediaAction"
				}  `}
			>
				
				{mediaData.activeMediaAction === "camera" && <MediaActionCamera data={props.data} />}
				{mediaData.activeMediaAction === "voice" && <MediaActionVoice data={props.data} />}
				{mediaData.activeMediaAction === "video" && <MediaActionVideo data={props.data} />}
				{mediaData.activeMediaAction === "gallery" && <MediaActionGallery data={props.data} />}
			</div>
		);
}

export default MediaAction