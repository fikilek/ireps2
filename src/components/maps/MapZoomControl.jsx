import { useMap } from '@vis.gl/react-google-maps'
import './MapZoomControl.css'
import { useState } from 'react'

const MapZoomControl = () => {
  const [zoomLevel, setZoomLevel] = useState(15)
  const map  = useMap()
  const handleZoom = e => {
    console.log(`e.target.id`, e.target.id)
    map.setZoom(Number(e.target.id))
    setZoomLevel(e.target.id)
  }
  return (
			<div className="map-zoom-control">
				<button className={zoomLevel === '5' ? "activeZoom" : ''} id={5} onClick={handleZoom}>
					5
				</button>
				<button className={zoomLevel === '14' ? "activeZoom" : ''} id={14} onClick={handleZoom}>
					14
				</button>
				<button className={zoomLevel === '16' ? "activeZoom" : '' } id={16} onClick={handleZoom}>
					16
				</button>
				<button className={zoomLevel === '18' ? "activeZoom" : '' } id={18} onClick={handleZoom}>
					18
				</button>
				<button className={zoomLevel === '20' ? "activeZoom" : '' } id={20} onClick={handleZoom}>
					20
				</button>
			</div>
		);
}

export default MapZoomControl