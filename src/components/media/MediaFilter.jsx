import { IconContext } from 'react-icons';
import './MediaFilter.css'
import { FaImage, FaMicrophone } from 'react-icons/fa';
import { IoIosVideocam } from 'react-icons/io';

const MediaFilter = (props) => {
  const {filterTitle} = props
  return (
			<div className="media-filter">
				<div className='title'>{filterTitle}</div>
				<div className="media-filter-btn">
					<button className="mfb mfb-photos" title="take a photo with camera">
						<IconContext.Provider value={{ color: "blue", fontSize: "3rem" }}>
							<FaImage />
						</IconContext.Provider>
					</button>
					<span>3</span>
				</div>
				<div className="media-filter-btn">
					<button className="mfb mfb-voice-clips" title="make a voice clip">
						<IconContext.Provider value={{ color: "blue", fontSize: "3rem" }}>
							<FaMicrophone />
						</IconContext.Provider>
					</button>
					<span>2</span>
				</div>
				<div className="media-filter-btn">
					<button className="mfb mfb-video-clips" title="make a video clip">
						<IconContext.Provider value={{ color: "blue", fontSize: "3rem" }}>
							<IoIosVideocam />
						</IconContext.Provider>
					</button>
					<span>1</span>
				</div>
			</div>
		);
}

export default MediaFilter